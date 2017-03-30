"use strict";
const RouterBase = require('../../../common/routerbase');

class DeleteResource extends RouterBase {
    handle() {
        let resourceId = this.req.body.resourceId;
        this.req.models.Resource.get(resourceId, (err, resource) => {
            resource.getPlans().remove((err) => {
                resource.remove((err) => {
                    this.result.code = 1;
                    this.result.msg = '删除资源位成功';
                    this.res.json(this.result);
                });
            })
        });
    }
}

module.exports = DeleteResource.makeRouteHandler();
