"use strict";
const RouterBase = require('../../../common/routerbase');

class showPlans extends RouterBase {
    handle() {
      this.req.models.Plan.get(1,(err,results) => {
        this.res.json(results);
      });
    }
}

module.exports = showPlans.makeRouteHandler();
