"use strict";
const RouterBase = require('../../../common/routerbase');

class showPlans extends RouterBase {
    handle() {
      this.req.models.Plan.settings.set("pagination.perpage", 10);
      this.req.models.Plan.pages( (err, pages) => {
          console.log("Total pages: %d", pages);
          this.req.models.Plan.page(1).run( (err, plans) => {
              this.res.json(plans);
          });
      });
    }
}

module.exports = showPlans.makeRouteHandler();
