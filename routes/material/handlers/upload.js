"use strict";
const path = require('path');
const multiparty = require('multiparty');
const RouterBase = require('../../../common/routerbase');
const UploadQiniu = require('../../../common/uploadQiniu');

class ImageUploader extends RouterBase {
    constructor() {
        super(...arguments);

        // 图片允许上传的最大文件大小，单位(M)
        this.MAX_FILE_SIZE = 5;
        this.result = {
            'code': -1,
            'msg': '',
            'data': {}
        };
    }

    handle() {
        this.parseForm().then(({fields, files}) => {
            // console.log(fields);
            // console.log(files);
            if (!('image' in files)) {
                this.result.msg = '参数错误'; //上传的文件字段名为‘image’
                return;
            }

            const imageFile = files.image[0];
            return new UploadQiniu(imageFile.path).handle();
        }).catch(e => {
            console.log(e);
            if (e.statusCode === 413) {
                this.result.msg = `单个不超过${this.MAX_FILE_SIZE}MB`;
            } else {
                this.result.msg = '图片上传失败，请稍候再试';
            }
        }).then((imageUrl) => {
            this.result.code = 1;
            this.result.msg = '上传成功';
            this.result.data.imageUrl = imageUrl;
            this.res.json(this.result);
        });
    }

    parseForm() {
        const form = new multiparty.Form({
            encoding: 'utf8',
            maxFilesSize: this.MAX_FILE_SIZE * 1024 * 1024,
            autoFiles: true,
            uploadDir: path.join(global.SERVER_ROOT, 'upload')
        });

        return new Promise((resolve, reject) => {
            form.parse(this.req, (err, fields = {}, files = {}) => {
                return err
                    ? reject(err)
                    : resolve({fields, files});
            });
        });
    }
}

module.exports = ImageUploader.makeRouteHandler();
