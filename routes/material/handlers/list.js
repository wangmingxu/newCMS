"use strict";
const RouterBase = require('../../../common/routerbase');

class ListImages extends RouterBase {
    handle() {
      let materialType = this.req.query.materialType || 'image';
      this.req.models.Material.find({materialType:materialType},(err,result)=>{
        this.res.json(result);
      });
    }
}

module.exports = ListImages.makeRouteHandler();
