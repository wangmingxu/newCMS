/**
 * ORM同步数据库中间件
 */
"use strict";

var orm = require('orm');
var paging = require("orm-paging");
var modts = require('orm-timestamps');
var _ = require('lodash');
var database = require('../database-prod.js');
var Model = require('../models');
var ModelLink = require('../models/ModelLink');

module.exports = orm.express(database.mysql, {
    define: function define(db, models, next) {
        //自动生成时间戳
        db.use(modts, {
            createdProperty: 'created_at',
            modifiedProperty: 'modified_at',
            expireProperty: false,
            dbtype: { type: 'date', time: true },
            now: function now() {
                return new Date();
            },
            expire: function expire() {
                var d = new Date();return d.setMinutes(d.getMinutes() + 60);
            },
            persist: true
        });
        //分页中间件
        db.use(paging);
        //定义模型
        _.each(Model, function (model) {
            models[model.name] = db.define(model.name, model.props, model.opts);
        });
        //定义模型间关联
        new ModelLink(models);
        //同步数据库
        db.sync(function (err) {
            if (err) throw err;
            next();
        });
    }
});
