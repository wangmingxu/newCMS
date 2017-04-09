"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');
var moment = require('moment');

var CreatePlan = function (_RouterBase) {
  _inherits(CreatePlan, _RouterBase);

  function CreatePlan() {
    _classCallCheck(this, CreatePlan);

    return _possibleConstructorReturn(this, (CreatePlan.__proto__ || Object.getPrototypeOf(CreatePlan)).apply(this, arguments));
  }

  _createClass(CreatePlan, [{
    key: 'handle',
    value: function handle() {
      var _this2 = this;

      var newPlan = Object.assign({}, this.req.body);
      newPlan.startTime = this.req.body.startTime || Date.now();
      newPlan.endTime = this.req.body.endTime || Date.now();
      newPlan.interface = JSON.stringify(newPlan.interface);
      this.req.models.Plan.create(newPlan, function (err, results) {
        if (err) throw err;
        _this2.res.json(results);
      });
    }
  }]);

  return CreatePlan;
}(RouterBase);

module.exports = CreatePlan.makeRouteHandler();