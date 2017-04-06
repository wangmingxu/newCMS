"use strict";
const RouterBase = require('../../../common/routerbase');
const Utils = require('../../../common/utils');

class showPlans extends RouterBase {
    handle() {
        let perpage = this.req.query.perpage || 10;
        let page = this.req.query.page || 1;
        let effective = this.req.query.effective
            ? Number(this.req.query.effective)
            : null;
        let queryParams = {
            effective
        };
        queryParams = Utils.delEmptyProps(queryParams);
        this.req.models.Plan.settings.set("pagination.perpage", perpage);
        this.req.models.Plan.find(queryParams,["created_at","Z"]).page(page).count((err, totalNum) => {
            this.result.totalNum = totalNum;
            this.result.totalPage = Math.ceil(totalNum / perpage);
            this.result.perpage = perpage;
            this.result.page = Number(page);
        }).all((err, result) => {
            this.result.code = 1;
            this.result.msg = "查询成功";
            this.result.data = result;
            this.res.json(this.result);
        });
    }
}

module.exports = showPlans.makeRouteHandler();
