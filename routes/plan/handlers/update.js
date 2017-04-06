"use strict";
const RouterBase = require('../../../common/routerbase');

class UpdatePlan extends RouterBase {
    handle() {
        let planId = this.req.params.id;
        this.req.models.Plan.get(planId, (err, plan) => {
            plan.planName = this.req.body.planName || plan.planName;
            plan.interface = this.req.body.interface?JSON.stringify(this.req.body.interface):plan.interface;
            plan.startTime = this.req.body.startTime?new Date(this.req.body.startTime):plan.startTime;
            plan.endTime = this.req.body.endTime?new Date(this.req.body.endTime):plan.endTime;
            plan.effective = typeof(this.req.body.effective)!=='undefined'?this.req.body.effective:plan.effective;
            plan.save((err) => {
                if (err)
                    throw err;
                this.result.code = 1;
                this.result.msg = "计划修改成功";
                this.res.json(this.result);
            });
        });
    }
}

module.exports = UpdatePlan.makeRouteHandler();
