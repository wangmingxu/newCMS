"use strict";
const RouterBase = require('../../../common/routerbase');
const moment = require("moment");

class findPlan extends RouterBase {
    handle() {
      let planId = this.req.params.id;
      new Promise((resolve,reject)=>{
        this.req.models.Plan.get(planId,(err, plan)=>{
          resolve(plan);
        });
      })
      .then((plan)=>{
        this.res.json(plan);
      });
    }
}

module.exports = findPlan.makeRouteHandler();
