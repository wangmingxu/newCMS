/**
 * 封装的路由公共基类，用于添加公用方法，不能直接实例化
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouterBase = function () {
    /**
     * 把req,res,next绑定到this
     */
    function RouterBase(req, res, next) {
        _classCallCheck(this, RouterBase);

        var result = {
            'code': -1,
            'msg': '',
            'data': {}
        };
        Object.assign(this, { req: req, res: res, next: next, result: result });
    }

    /**
     * 静态工厂方法：创建用以响应路由的回调函数
     */


    _createClass(RouterBase, [{
        key: 'handle',


        /**
         * 子类实现该方法处理请求
         */
        value: function handle() {
            throw new Error('Please implement instance method `' + this.constructor.name + '::handle`.');
        }
    }], [{
        key: 'makeRouteHandler',
        value: function makeRouteHandler() {
            var _this = this;

            return function (req, res, next) {
                return new _this(req, res, next).handle();
            };
        }
    }]);

    return RouterBase;
}();

module.exports = RouterBase;