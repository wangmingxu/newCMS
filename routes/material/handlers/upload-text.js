"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var TextUploader = function (_RouterBase) {
    _inherits(TextUploader, _RouterBase);

    function TextUploader() {
        _classCallCheck(this, TextUploader);

        return _possibleConstructorReturn(this, (TextUploader.__proto__ || Object.getPrototypeOf(TextUploader)).apply(this, arguments));
    }

    _createClass(TextUploader, [{
        key: 'handle',
        value: function handle() {
            var _this2 = this;

            var _req$body = this.req.body,
                materialName = _req$body.materialName,
                content = _req$body.content;

            var newMaterial = {
                materialName: materialName,
                content: content,
                materialType: 'text'
            };
            this.req.models.Material.create(newMaterial, function (err, material) {
                _this2.result.code = 1;
                _this2.result.msg = "上传素材成功";
                _this2.result.data = material;
                _this2.res.json(_this2.result);
            });
        }
    }]);

    return TextUploader;
}(RouterBase);

module.exports = TextUploader.makeRouteHandler();