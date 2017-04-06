"use strict";
const RouterBase = require('../../../common/routerbase');

class ListMaterials extends RouterBase {
    handle() {
      let materialType = this.req.query.materialType || 'image';
      let perpage = this.req.query.perpage || 20;
      let page = this.req.query.page || 1;
      this.req.models.Material.settings.set("pagination.perpage", perpage);
      this.req.models.Material.find({materialType:materialType},["created_at","Z"]).page(page)
      .count((err,totalNum)=>{
        this.result.totalNum = totalNum;
        this.result.totalPage = Math.ceil(totalNum/perpage);
        this.result.perpage = perpage;
        this.result.page = Number(page);
      })
      .all((err,result)=>{
        this.result.code = 1;
        this.result.msg = "查询成功";
        this.result.data = result;
        this.res.json(this.result);
      });
    }
}

module.exports = ListMaterials.makeRouteHandler();
