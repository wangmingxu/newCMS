/**
 * ORM同步数据库中间件
 */
"use strict";
const orm = require('orm');
const _ = require('lodash');
const db_config = require('../database-test.js');
const Model = require('../models');
const Association = require('../models/association');

module.exports = orm.express(db_config.postgresql, {
    define: function(db, models, next) {
        _.each(Model, (model) => {
            models[model.name] = db.define(model.name, model.props, model.opts);
        });
        Association(db, models);
        db.sync(function(err) {
            if (err)
                throw err;
            next();
        });
    }
});
