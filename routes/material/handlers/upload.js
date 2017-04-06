"use strict";
const fs = require('fs');
const shortid = require('shortid');
const RouterBase = require('../../../common/routerbase');
const UploadQiniu = require('../../../common/uploadQiniu');
const fileType = require('file-type');

class Uploader extends RouterBase {
    constructor() {
        super(...arguments);
    }

    handle() {
        if(this.req.body.materialType==='text'){
          this.uploadText();
        }else{
          this.uploadImage();
        }
    }

    uploadImage() {
        this.parseForm().then((srcpathArr) => {
            let destArr = srcpathArr.map((srcpath) => {
                return new UploadQiniu(srcpath).handle();
            });
            return Promise.all(destArr);
        }).then((destArr) => {
            let cbArr = this.req.body.files.map((item, i) => {
                let newMaterial = {
                    materialName: item.name,
                    materialType: 'image',
                    content: destArr[i]
                };
                return new Promise((resolve, reject) => {
                    this.req.models.Material.create(newMaterial, (err, results) => {
                        if (err)
                            throw err;
                        resolve(results);
                    });
                })
            });
            return Promise.all(cbArr);
        }).then((resArr) => {
            this.result.code = 1;
            this.result.msg = '上传成功';
            this.result.data = resArr;
            this.res.json(this.result);
        })
    }

    parseForm() {
        let tempArr = this.req.body.files.map((item) => {
            return new Promise((resolve, reject) => {
                let base64 = item.url.replace(/^data:image\/\w+;base64,/, "");
                let dataBuffer = new Buffer(base64, 'base64');
                let _fileType = fileType(dataBuffer);
                let dest = `${global.UPLOAD_ROOT}/${shortid.generate()}.${_fileType.ext}`;
                fs.writeFile(dest, dataBuffer, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(dest);
                    }
                })
            })
        });
        return Promise.all(tempArr);
    }

    uploadText() {
        let {materialName, content} = this.req.body;
        let newMaterial = {
            materialName,
            content,
            materialType: 'text'
        };
        this.req.models.Material.create(newMaterial, (err, material) => {
            this.result.code = 1;
            this.result.msg = "上传素材成功";
            this.result.data = material;
            this.res.json(this.result);
        });
    }
}

module.exports = Uploader.makeRouteHandler();
