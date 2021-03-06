"use strict";
const RouterBase = require('../../../common/routerbase');
const moment = require('moment');

class CreatePlan extends RouterBase {
    handle() {
      let newPlan = Object.assign({}, this.req.body);
      newPlan.startTime = this.req.body.startTime || Date.now();
      newPlan.endTime = this.req.body.endTime || Date.now();
      newPlan.interface = JSON.stringify(newPlan.interface);
      this.req.models.Plan.create(newPlan, (err, results) => {
        if (err) throw err;
        this.res.json(results);
      });
    }
}

module.exports = CreatePlan.makeRouteHandler();
