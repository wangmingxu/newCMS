'use strict';

module.exports = function (router) {
    // 登录
    router.post('/', require('./handlers/login'));
};