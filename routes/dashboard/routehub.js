'use strict';

module.exports = function (router) {
    // 统计
    router.get('/count', require('./handlers/count'));
};