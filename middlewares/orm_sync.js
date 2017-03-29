/**
 * ORM同步数据库中间件
 */
"use strict";
const orm = require('orm');
const paging = require("orm-paging");
const modts = require('orm-timestamps');
const _ = require('lodash');
const db_config = require('../database-test.js');
const Model = require('../models');
const ModelLink = require('../models/ModelLink');

module.exports = orm.express(db_config.mysql, {
    define: function(db, models, next) {
        //自动生成时间戳
      	db.use(modts, {
      		createdProperty: 'created_at',
      		modifiedProperty: 'modified_at',
      		expireProperty: false,
      		dbtype: { type: 'date', time: true },
      		now: function() { return new Date(); },
      		expire: function() { var d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
      		persist: true
      	});
        //分页中间件
        db.use(paging);
        //定义模型
        _.each(Model, (model) => {
            models[model.name] = db.define(model.name, model.props, model.opts);
        });
        //定义模型间关联
        new ModelLink(models);
        //同步数据库
        db.sync(function(err) {
            if (err)
                throw err;
            next();
        });
    }
});
