"use strict";
const RouterBase = require('../../../common/routerbase');

class showResources extends RouterBase {
    handle() {
      new Promise((resolve,reject)=>{
        this.req.models.Resource.get(1,(err, resource)=>{
          resolve(resource);
        })
      })
      .then((resource)=>{
        this.res.json(resource);
      });
    }
}

module.exports = showResources.makeRouteHandler();
