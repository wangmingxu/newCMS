'use strict';

module.exports = function (router) {
    // 登录
    router.post('/login', require('./handlers/login'));

    // 退出登录
    router.get('/logout', require('./handlers/logout'));
};