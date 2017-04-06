/**
 * 基本工具类
 */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        //

        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "delEmptyProps",
        value: function delEmptyProps(obj) {
            var param = {};
            if (obj === null || obj === undefined || obj === "") return param;
            for (var key in obj) {
                if (_typeof(obj[key]) === "object" && obj[key] !== null) {
                    param[key] = this.delEmptyProps(obj[key]);
                } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
                    param[key] = obj[key];
                }
            }
            return param;
        }
    }]);

    return Utils;
}();

module.exports = Utils;