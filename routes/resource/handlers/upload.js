"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var shortid = require('shortid');
var RouterBase = require('../../../common/routerbase');
var config = require('../../../config');
var cos = require('../../../services/cos');

var ImageUploader = function (_RouterBase) {
    _inherits(ImageUploader, _RouterBase);

    function ImageUploader() {
        _classCallCheck(this, ImageUploader);

        // 图片允许上传的最大文件大小，单位(M)
        var _this = _possibleConstructorReturn(this, (ImageUploader.__proto__ || Object.getPrototypeOf(ImageUploader)).apply(this, arguments));

        _this.MAX_FILE_SIZE = 5;
        return _this;
    }

    _createClass(ImageUploader, [{
        key: 'handle',
        value: function handle() {
            var _this2 = this;

            var result = { 'code': -1, 'msg': '', 'data': {} };

            this.parseForm().then(function (_ref) {
                var files = _ref.files;

                if (!('image' in files)) {
                    result.msg = '参数错误';
                    return;
                }

                var imageFile = files.image[0];

                var buffer = readChunk.sync(imageFile.path, 0, 262);
                var resultType = fileType(buffer);
                if (!resultType || !['image/jpeg', 'image/png'].includes(resultType.mime)) {
                    result.msg = '仅jpg/png格式';
                    return;
                }

                var srcpath = imageFile.path;
                var uploadFolder = (config.cosUploadFolder + '/').replace(/\/+$/, '/');
                var destpath = '' + uploadFolder + Date.now() + '-' + shortid.generate() + '.' + resultType.ext;

                return new Promise(function (resolve, reject) {
                    cos.upload(srcpath, config.cosFileBucket, destpath, 0, function (res) {
                        if (res.code === 0) {
                            result.code = 0;
                            result.msg = 'ok';
                            result.data.imgUrl = res.data.access_url;

                            resolve();
                        } else {
                            reject();
                        }

                        // remove uploaded file
                        fs.unlink(srcpath);
                    });
                });
            }).catch(function (e) {
                if (e.statusCode === 413) {
                    result.msg = '\u5355\u4E2A\u4E0D\u8D85\u8FC7' + _this2.MAX_FILE_SIZE + 'MB';
                } else {
                    result.msg = '图片上传失败，请稍候再试';
                }
            }).then(function () {
                _this2.res.json(result);
            });
        }
    }, {
        key: 'parseForm',
        value: function parseForm() {
            var _this3 = this;

            var form = new multiparty.Form({
                encoding: 'utf8',
                maxFilesSize: this.MAX_FILE_SIZE * 1024 * 1024,
                autoFiles: true,
                uploadDir: path.join(global.SERVER_ROOT, 'tmp')
            });

            return new Promise(function (resolve, reject) {
                form.parse(_this3.req, function (err) {
                    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var files = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                    return err ? reject(err) : resolve({ fields: fields, files: files });
                });
            });
        }
    }]);

    return ImageUploader;
}(RouterBase);

module.exports = ImageUploader.makeRouteHandler();