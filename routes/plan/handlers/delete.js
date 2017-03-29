"use strict";
const RouterBase = require('../../../common/routerbase');

class DeletePlan extends RouterBase {
    handle() {
        let planId = this.req.body.planId;
        let result = {
            code: 1,
            msg: '删除计划成功'
        };
        this.req.models.Plan.get(planId, (err, plan) => {
            plan.remove((err) => {
                this.res.json(result);
            });
        });
    }
}

module.exports = DeletePlan.makeRouteHandler();
