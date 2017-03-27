"use strict";
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const shortid = require('shortid');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const qiniu = require("qiniu");

class ImageUploader extends RouterBase {
    constructor() {
        super(...arguments);

        // 图片允许上传的最大文件大小，单位(M)
        this.MAX_FILE_SIZE = 5;
    }

    handle() {
        const result = { 'code': -1, 'msg': '', 'data': {} };

        this.parseForm()
            .then(({ fields,files }) => {
              console.log(fields);
              console.log(files);
                if (!('image' in files)) {
                    result.msg = '参数错误';//上传的文件字段名为‘image’
                    return;
                }

                const imageFile = files.image[0];

                const buffer = readChunk.sync(imageFile.path, 0, 262);
                const resultType = fileType(buffer);
                if (!resultType || !['image/jpeg', 'image/png'].includes(resultType.mime)) {
                    result.msg = '仅支持jpg/png格式的文件上传';
                    return;
                }

                let srcpath = imageFile.path;
                let key = `${shortid.generate()}.${resultType.ext}`;
                qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
                qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

                let token = new qiniu.rs.PutPolicy(config.qiniu.bucket+":"+key).token();

                return new Promise((resolve, reject) => {
                    var extra = new qiniu.io.PutExtra();
                    qiniu.io.putFile(token, key, srcpath, extra, function(err, ret) {
                      if(!err) {
                        // 上传成功， 处理返回值
                        console.log(ret.hash, ret.key, ret.persistentId);
                        result.code = 0;
                        result.msg = 'ok';
                        result.data.imageUrl = config.qiniu.imageUrlPrefix+key;
                        resolve();
                      } else {
                        // 上传失败， 处理返回代码
                        console.log(err);
                        reject();
                      }
                      // remove uploaded file
                      fs.unlink(srcpath);
                  });
                });

            })
            .catch(e => {
                console.log(e);
                if (e.statusCode === 413) {
                    result.msg = `单个不超过${this.MAX_FILE_SIZE}MB`;
                } else {
                    result.msg = '图片上传失败，请稍候再试';
                }
            })
            .then(() => {
                this.res.json(result);
            });
    }

    parseForm() {
        const form = new multiparty.Form({
            encoding: 'utf8',
            maxFilesSize: this.MAX_FILE_SIZE * 1024 * 1024,
            autoFiles: true,
            uploadDir: path.join(global.SERVER_ROOT, 'upload'),
        });

        return new Promise((resolve, reject) => {
            form.parse(this.req, (err, fields = {}, files = {}) => {
                return err ? reject(err) : resolve({ fields, files });
            });
        });
    }
}

module.exports = ImageUploader.makeRouteHandler();
