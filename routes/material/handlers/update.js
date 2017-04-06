"use strict";
const RouterBase = require('../../../common/routerbase');

class UpdateMaterial extends RouterBase {
    handle() {
        let materialId = this.req.params.id;
        let {materialName, content} = this.req.body;
        this.req.models.Material.get(materialId, (err, material) => {
            material.materialName = materialName
            material.content = content;
            material.save((err) => {
                if (err)
                    throw err;
                this.result.code = 1;
                this.result.msg = "素材修改成功";
                this.res.json(this.result);
            });
        });
    }
}

module.exports = UpdateMaterial.makeRouteHandler();
