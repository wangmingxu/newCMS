"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var findResource = function (_RouterBase) {
  _inherits(findResource, _RouterBase);

  function findResource() {
    _classCallCheck(this, findResource);

    return _possibleConstructorReturn(this, (findResource.__proto__ || Object.getPrototypeOf(findResource)).apply(this, arguments));
  }

  _createClass(findResource, [{
    key: "handle",
    value: function handle() {
      var _this2 = this;

      var resourceId = this.req.params.id;
      new Promise(function (resolve, reject) {
        _this2.req.models.Resource.get(resourceId, function (err, resource) {
          resolve(resource);
        });
      }).then(function (resource) {
        _this2.res.json(resource);
      });
    }
  }]);

  return findResource;
}(RouterBase);

module.exports = findResource.makeRouteHandler();