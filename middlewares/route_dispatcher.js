/**
 * 通用路由分发器
 */
"use strict";

var express = require('express');
var path = require('path');
var _ = require('lodash');
var config = require('../config');
var routes = require('../routes');

var routeOptions = { 'caseSensitive': true, 'strict': true };
var routeDispatcher = express.Router(routeOptions);

_.each(routes, function (route, subpath) {
    var router = express.Router(routeOptions);

    var routePath = void 0;

    // ignore `config.ROUTE_BASE_PATH` if `subpath` begin with `~`
    if (subpath[0] === '~') {
        routePath = subpath.slice(1);
    } else {
        routePath = config.ROUTE_BASE_PATH + subpath;
    }

    require(path.join(global.SERVER_ROOT, 'routes', route))(router);

    //router是中间件，这里做了一个路由分组
    routeDispatcher.use(routePath, router, function (err, req, res, next) {
        // mute `URIError` error
        if (err instanceof URIError) {
            return next();
        }

        throw err;
    });
});

module.exports = routeDispatcher;