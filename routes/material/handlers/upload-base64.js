"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');
var shortid = require('shortid');
var RouterBase = require('../../../common/routerbase');
var UploadQiniu = require('../../../common/uploadQiniu');
var fileType = require('file-type');

var Base64Uploader = function (_RouterBase) {
    _inherits(Base64Uploader, _RouterBase);

    function Base64Uploader() {
        _classCallCheck(this, Base64Uploader);

        return _possibleConstructorReturn(this, (Base64Uploader.__proto__ || Object.getPrototypeOf(Base64Uploader)).apply(this, arguments));
    }

    _createClass(Base64Uploader, [{
        key: 'handle',
        value: function handle() {
            var _this2 = this;

            this.parseForm().then(function (srcpathArr) {
                var destArr = srcpathArr.map(function (srcpath) {
                    return new UploadQiniu(srcpath).handle();
                });
                return Promise.all(destArr);
            }).then(function (destArr) {
                var cbArr = _this2.req.body.map(function (item, i) {
                    var newMaterial = {
                        materialName: item.name,
                        materialType: 'image',
                        content: destArr[i]
                    };
                    return new Promise(function (resolve, reject) {
                        _this2.req.models.Material.create(newMaterial, function (err, results) {
                            if (err) throw err;
                            resolve(results);
                        });
                    });
                });
                return Promise.all(cbArr);
            }).then(function (resArr) {
                _this2.result.code = 1;
                _this2.result.msg = '上传成功';
                _this2.result.data = resArr;
                _this2.res.json(_this2.result);
            });
        }
    }, {
        key: 'parseForm',
        value: function parseForm() {
            var tempArr = this.req.body.map(function (item) {
                return new Promise(function (resolve, reject) {
                    var base64 = item.url.replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64, 'base64');
                    var _fileType = fileType(dataBuffer);
                    var dest = global.UPLOAD_ROOT + '/' + shortid.generate() + '.' + _fileType.ext;
                    fs.writeFile(dest, dataBuffer, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dest);
                        }
                    });
                });
            });
            return Promise.all(tempArr);
        }
    }]);

    return Base64Uploader;
}(RouterBase);

module.exports = Base64Uploader.makeRouteHandler();