"use strict";
const RouterBase = require('../../../common/routerbase');

class DeleteImage extends RouterBase {
    handle() {
      let materialId = this.req.body.materialId;
      this.req.models.Material.get(materialId, (err, material) => {
          material.remove((err) => {
              this.result.code = 1;
              this.result.msg = '删除素材成功';
              this.res.json(this.result);
          });
      });
    }
}

module.exports = DeleteImage.makeRouteHandler();
