"use strict";
const RouterBase = require('../../../common/routerbase');

class CreateResource extends RouterBase {
    handle() {
      let newResource = Object.assign({}, this.req.body);
      newResource.interface = JSON.stringify(newResource.interface);
      this.req.models.Resource.create(newResource, (err, results) => {
        if (err) throw err;
        this.res.json(results);
      });
    }
}

module.exports = CreateResource.makeRouteHandler();
