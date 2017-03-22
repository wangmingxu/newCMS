"use strict";
const RouterBase = require('../../../common/routerbase');

class showPlans extends RouterBase {
    handle() {
      this.req.models.Plan.settings.set("pagination.perpage", 10);
      this.req.models.Plan.pages( (err, pages) => {
          console.log("Total pages: %d", pages);
          this.req.models.Plan.page(2).run( (err, plans) => {
              this.res.json(plans);
          });
      });
      // this.req.models.Plan.get(1,(err,results) => {
      //   this.res.json(results);
      // });
    }
}

module.exports = showPlans.makeRouteHandler();
