"use strict";
const RouterBase = require('../../../common/routerbase');

class DeleteImage extends RouterBase {
    handle() {
      let materialId = this.req.body.materialId;
      let result = {
          code: 1,
          msg: '删除素材成功'
      };
      this.req.models.Material.get(materialId, (err, material) => {
          material.remove((err) => {
              this.res.json(result);
          });
      });
    }
}

module.exports = DeleteImage.makeRouteHandler();
