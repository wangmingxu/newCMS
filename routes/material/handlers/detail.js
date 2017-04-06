"use strict";
const RouterBase = require('../../../common/routerbase');

class FindMaterial extends RouterBase {
    handle() {
      let materialId = this.req.params.id;
      new Promise((resolve,reject)=>{
        this.req.models.Material.get(materialId,(err, material)=>{
          resolve(material);
        });
      })
      .then((material)=>{
        this.res.json(material);
      });
    }
}

module.exports = FindMaterial.makeRouteHandler();
