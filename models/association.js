/**
 * 定义模型之间的关联
 */
"use strict";
module.exports = function(db, models) {
    //计划和资源位进行关联
    models.Plan.hasOne("resource", models.Resource, {
        reverse: "plans",//反向关联
        mergeTable: 'cms_resource',//自定义的表名
        autoFetch: true,//自动关联
    });
};
