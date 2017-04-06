"use strict";
const RouterBase = require('../../../common/routerbase');

class UpdateResource extends RouterBase {
    handle() {
        let resourceId = this.req.params.id;
        this.req.models.Resource.get(resourceId, (err, resource) => {
            resource.resourceName = this.req.body.resourceName
            resource.interface = JSON.stringify(this.req.body.interface);
            resource.remark = this.req.body.remark;
            resource.save((err) => {
                if (err)
                    throw err;
                this.result.code = 1;
                this.result.msg = "计划修改成功";
                this.res.json(this.result);
            });
        });
    }
}

module.exports = UpdateResource.makeRouteHandler();
