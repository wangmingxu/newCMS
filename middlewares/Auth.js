/**
 * 登录认证中间件
 */
"use strict";
const express = require('express');
const config = require('../config');
const routeOptions = {
    'caseSensitive': true,
    'strict': true
};
const router = express.Router(routeOptions);

router.use(config.ROUTE_BASE_PATH, (req, res, next) => {
    if (req.originalUrl.indexOf('user') > -1 || req.originalUrl.indexOf('show') > -1) {
        return next();
    }
    if (!req.session.user) {
        return res.status(403).json({code: 0, msg: "请先登录!"});
    }
    next();
});

module.exports = router;
