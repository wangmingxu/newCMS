"use strict";
const RouterBase = require('../../../common/routerbase');

class FindOnlinePlan extends RouterBase {
    handle() {
        let resourceId = this.req.params.id;
        new Promise((resolve, reject) => {
            this.req.models.Resource.get(resourceId, (err, resource) => {
                resolve(resource);
            });
        })
        .then((resource) => {
            return new Promise((resolve, reject) => {
                let nowTime = Date.now();
                resource.getPlans().all().each()
                .filter((plan) => {
                    return (plan.startTime <= nowTime) && (plan.endTime >= nowTime);
                })
                .get((onlinePlans) => {
                    resolve(onlinePlans);
                });
            })
        })
        .then((onlinePlans) => {
            if (onlinePlans.length > 0) {
                this.res.jsonp(JSON.parse(onlinePlans[0].interface));
            } else {
                this.result.msg = "查询在线计划失败";
                this.res.jsonp(this.result);
            }
        })
    }
}

module.exports = FindOnlinePlan.makeRouteHandler();
