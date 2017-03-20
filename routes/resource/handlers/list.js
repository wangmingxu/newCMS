"use strict";
const RouterBase = require('../../../common/routerbase');

class showResources extends RouterBase {
    handle() {
      this.req.models.Resource.get(1,(err, resource) => {
        this.res.json(resource);
        // resource.getPlans((err,results) => {
        //   this.res.json(results);
        // });
      });
    }
}

module.exports = showResources.makeRouteHandler();
