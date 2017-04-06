"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var UpdatePlan = function (_RouterBase) {
    _inherits(UpdatePlan, _RouterBase);

    function UpdatePlan() {
        _classCallCheck(this, UpdatePlan);

        return _possibleConstructorReturn(this, (UpdatePlan.__proto__ || Object.getPrototypeOf(UpdatePlan)).apply(this, arguments));
    }

    _createClass(UpdatePlan, [{
        key: 'handle',
        value: function handle() {
            var _this2 = this;

            var planId = this.req.params.id;
            this.req.models.Plan.get(planId, function (err, plan) {
                plan.planName = _this2.req.body.planName || plan.planName;
                plan.interface = _typeof(_this2.req.body.interface) === 'object' ? JSON.stringify(_this2.req.body.interface) : plan.interface;
                plan.startTime = _this2.req.body.startTime ? new Date(_this2.req.body.startTime) : plan.startTime;
                plan.endTime = _this2.req.body.endTime ? new Date(_this2.req.body.endTime) : plan.endTime;
                plan.effective = typeof _this2.req.body.effective !== 'undefined' ? _this2.req.body.effective : plan.effective;
                plan.save(function (err) {
                    if (err) throw err;
                    _this2.result.code = 1;
                    _this2.result.msg = "计划修改成功";
                    _this2.res.json(_this2.result);
                });
            });
        }
    }]);

    return UpdatePlan;
}(RouterBase);

module.exports = UpdatePlan.makeRouteHandler();