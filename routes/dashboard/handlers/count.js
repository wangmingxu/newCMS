"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');

var countAll = function (_RouterBase) {
    _inherits(countAll, _RouterBase);

    function countAll() {
        _classCallCheck(this, countAll);

        return _possibleConstructorReturn(this, (countAll.__proto__ || Object.getPrototypeOf(countAll)).apply(this, arguments));
    }

    _createClass(countAll, [{
        key: "handle",
        value: function handle() {
            var _this2 = this;

            var PlanCount = new Promise(function (resolve, reject) {
                _this2.req.models.Plan.count({}, function (err, countNum) {
                    resolve(countNum);
                });
            });
            var ResourceCount = new Promise(function (resolve, reject) {
                _this2.req.models.Resource.count({}, function (err, countNum) {
                    resolve(countNum);
                });
            });
            var MaterialCount = new Promise(function (resolve, reject) {
                _this2.req.models.Material.count({}, function (err, countNum) {
                    resolve(countNum);
                });
            });
            Promise.all([MaterialCount, ResourceCount, PlanCount]).then(function (values) {
                console.log(values);
                var result = {
                    materials_count: values[0],
                    resources_count: values[1],
                    plans_count: values[2]
                };
                _this2.res.json(result);
            });
        }
    }]);

    return countAll;
}(RouterBase);

module.exports = countAll.makeRouteHandler();