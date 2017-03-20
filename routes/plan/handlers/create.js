"use strict";
const RouterBase = require('../../../common/routerbase');
const moment = require('moment');

class CreatePlan extends RouterBase {
    handle() {
      let newRecord = {
        resource_id : 1,
        planName: "计划11",
        startTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        endTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        createTime:moment().format('YYYY-MM-DD HH:mm:ss')
      };
      this.req.models.Plan.create(newRecord, (err, results) => {
        if (err) throw err;
        this.res.json(results);
      });
    }
}

module.exports = CreatePlan.makeRouteHandler();
