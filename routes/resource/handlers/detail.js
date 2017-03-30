"use strict";
const RouterBase = require('../../../common/routerbase');

class findResource extends RouterBase {
    handle() {
      let resourceId = this.req.params.id;
      new Promise((resolve,reject)=>{
        this.req.models.Resource.get(resourceId,(err, resource)=>{
          resolve(resource);
        });
      })
      .then((resource)=>{
        this.res.json(resource);
      });
    }
}

module.exports = findResource.makeRouteHandler();
