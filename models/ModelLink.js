/**
 * 定义模型之间的关联
 */
"use strict";
class ModelLink {
    constructor(models) {
        Object.assign(this, {models});
        this.initialize();
    }

    initialize() {
        this.PlanLinkResource();
    }

    //计划和资源位进行关联
    PlanLinkResource() {
        this.models.Plan.hasOne("resource", this.models.Resource, {
            reverse: "plans", //反向关联
            mergeTable: 'cms_resource', //自定义的表名
            autoFetch: true, //自动关联
        });
    }
}

module.exports = ModelLink;
