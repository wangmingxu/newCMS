"use strict";
const RouterBase = require('../../../common/routerbase');
const moment = require('moment');

class CreateResource extends RouterBase {
    handle() {
      let newRecord = {
        resourceName : "资源位1",
        interface: "接口定义",
        createTime:moment().format('YYYY-MM-DD HH:mm:ss')
      };
      this.req.models.Resource.create(newRecord, (err, results) => {
        if (err) throw err;
        this.res.json(results);
      });
    }
}

module.exports = CreateResource.makeRouteHandler();
