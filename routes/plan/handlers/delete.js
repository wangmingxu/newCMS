"use strict";
const RouterBase = require('../../../common/routerbase');

class DeletePlan extends RouterBase {
    handle() {
        let planId = this.req.body.planId;
        this.req.models.Plan.get(planId, (err, plan) => {
            plan.remove((err) => {
                this.result.code = 1;
                this.result.msg = '删除计划成功';
                this.res.json(this.result);
            });
        });
    }
}

module.exports = DeletePlan.makeRouteHandler();
