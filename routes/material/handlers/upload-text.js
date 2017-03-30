"use strict";
const RouterBase = require('../../../common/routerbase');

class TextUploader extends RouterBase {
    constructor() {
        super(...arguments);
    }

    handle() {
        let {materialName, content} = this.req.body;
        let newMaterial = {
            materialName,
            content,
            materialType: 'text'
        };
        this.req.models.Material.create(newMaterial, (err, material) => {
            this.result.code = 1;
            this.result.msg = "上传素材成功";
            this.result.data = material;
            this.res.json(this.result);
        });
    }
}

module.exports = TextUploader.makeRouteHandler();
