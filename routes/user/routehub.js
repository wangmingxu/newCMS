'use strict';

module.exports = function (router) {
    // 登录
    router.post('/login', require('./handlers/login'));
};
