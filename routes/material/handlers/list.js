"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var ListMaterials = function (_RouterBase) {
  _inherits(ListMaterials, _RouterBase);

  function ListMaterials() {
    _classCallCheck(this, ListMaterials);

    return _possibleConstructorReturn(this, (ListMaterials.__proto__ || Object.getPrototypeOf(ListMaterials)).apply(this, arguments));
  }

  _createClass(ListMaterials, [{
    key: 'handle',
    value: function handle() {
      var _this2 = this;

      var materialType = this.req.query.materialType || 'image';
      var perpage = this.req.query.perpage || 20;
      var page = this.req.query.page || 1;
      this.req.models.Material.settings.set("pagination.perpage", perpage);
      this.req.models.Material.find({ materialType: materialType }, ["created_at", "Z"]).page(page).count(function (err, totalNum) {
        _this2.result.totalNum = totalNum;
        _this2.result.totalPage = Math.ceil(totalNum / perpage);
        _this2.result.perpage = perpage;
        _this2.result.page = Number(page);
      }).all(function (err, result) {
        _this2.result.code = 1;
        _this2.result.msg = "查询成功";
        _this2.result.data = result;
        _this2.res.json(_this2.result);
      });
    }
  }]);

  return ListMaterials;
}(RouterBase);

module.exports = ListMaterials.makeRouteHandler();