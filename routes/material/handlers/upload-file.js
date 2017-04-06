"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');
var multiparty = require('multiparty');
var RouterBase = require('../../../common/routerbase');
var UploadQiniu = require('../../../common/uploadQiniu');

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

            this.parseForm().then(function (srcpath) {
                return new UploadQiniu(srcpath).handle();
            }).then(function (imageUrl) {
                _this2.result.code = 1;
                _this2.result.msg = '上传成功';
                _this2.result.data.imageUrl = imageUrl;
                _this2.res.json(_this2.result);
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
                uploadDir: path.join(global.SERVER_ROOT, 'upload')
            });

            return new Promise(function (resolve, reject) {
                form.parse(_this3.req, function (err) {
                    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var files = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                    if (err) {
                        reject(err);
                    } else {
                        if (!('image' in files)) {
                            _this3.result.msg = '参数错误'; //上传的文件字段名为‘image’
                            _this3.res.json(_this3.result);
                        }

                        var imageFile = files.image[0]; //暂时只取一张
                        resolve(imageFile.path);
                    }
                });
            }).catch(function (e) {
                console.log(e);
                if (e.statusCode === 413) {
                    _this3.result.msg = '\u5355\u4E2A\u4E0D\u8D85\u8FC7' + _this3.MAX_FILE_SIZE + 'MB';
                } else {
                    _this3.result.msg = '图片上传失败，请稍候再试';
                }
            });
        }
    }]);

    return ImageUploader;
}(RouterBase);

module.exports = ImageUploader.makeRouteHandler();