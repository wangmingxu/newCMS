"use strict";
const RouterBase = require('../../../common/routerbase');

class DeleteResource extends RouterBase {
    handle() {
        let resourceId = this.req.body.resourceId;
        let result = {
            code: 1,
            msg: '删除资源位成功'
        };
        this.req.models.Resource.get(resourceId, (err, resource) => {
            resource.getPlans().remove((err) => {
                resource.remove((err) => {
                    this.res.json(result);
                });
            })
        });
    }
}

module.exports = DeleteResource.makeRouteHandler();
