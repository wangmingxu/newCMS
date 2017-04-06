/**
 * 七牛文件上传公共基类
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var shortid = require('shortid');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var qiniu = require("qiniu");
var config = require('../config');

var UploadQiniu = function () {
    function UploadQiniu(srcpath) {
        _classCallCheck(this, UploadQiniu);

        Object.assign(this, { srcpath: srcpath });
    }

    _createClass(UploadQiniu, [{
        key: 'handle',
        value: function handle() {
            var _this = this;

            var buffer = readChunk.sync(this.srcpath, 0, 262);
            var resultType = fileType(buffer);
            console.log(resultType);
            // if (!resultType || !['image/jpeg', 'image/png'].includes(resultType.mime)) {
            //     console.log('仅支持jpg/png格式的文件上传');
            //     return;
            // }
            var key = shortid.generate() + '.' + resultType.ext;
            qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
            qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

            var token = new qiniu.rs.PutPolicy(config.qiniu.bucket + ":" + key).token();

            return new Promise(function (resolve, reject) {
                var extra = new qiniu.io.PutExtra();
                qiniu.io.putFile(token, key, _this.srcpath, extra, function (err, ret) {
                    if (!err) {
                        // 上传成功， 处理返回值
                        console.log(ret.hash, ret.key, ret.persistentId);
                        var imageUrl = config.qiniu.imageUrlPrefix + key;
                        resolve(imageUrl);
                    } else {
                        // 上传失败， 处理返回代码
                        console.log(err);
                        reject();
                    }
                    // remove uploaded file
                    fs.unlink(_this.srcpath);
                });
            });
        }
    }]);

    return UploadQiniu;
}();

module.exports = UploadQiniu;