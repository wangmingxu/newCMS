"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var FindMaterial = function (_RouterBase) {
  _inherits(FindMaterial, _RouterBase);

  function FindMaterial() {
    _classCallCheck(this, FindMaterial);

    return _possibleConstructorReturn(this, (FindMaterial.__proto__ || Object.getPrototypeOf(FindMaterial)).apply(this, arguments));
  }

  _createClass(FindMaterial, [{
    key: "handle",
    value: function handle() {
      var _this2 = this;

      var materialId = this.req.params.id;
      new Promise(function (resolve, reject) {
        _this2.req.models.Material.get(materialId, function (err, material) {
          resolve(material);
        });
      }).then(function (material) {
        _this2.res.json(material);
      });
    }
  }]);

  return FindMaterial;
}(RouterBase);

module.exports = FindMaterial.makeRouteHandler();