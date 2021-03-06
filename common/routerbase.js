/**
 * 封装的路由公共基类，用于添加公用方法，不能直接实例化
 */
"use strict";
class RouterBase {
    /**
     * 把req,res,next绑定到this
     */
    constructor(req, res, next) {
        let result = {
            'code': -1,
            'msg': '',
            'data': {}
        }
        Object.assign(this, {req, res, next, result});
    }

    /**
     * 静态工厂方法：创建用以响应路由的回调函数
     */
    static makeRouteHandler() {
        return (req, res, next) => new this(req, res, next).handle();
    }

    /**
     * 子类实现该方法处理请求
     */
    handle() {
        throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
    }
}

module.exports = RouterBase;
