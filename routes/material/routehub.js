'use strict';

module.exports = function (router) {
    // 获取图片列表
    router.get('/', require('./handlers/list'));

    // 查找素材
    router.get('/:id', require('./handlers/detail'));

    // 上传素材
    router.post('/', require('./handlers/upload'));

    // 删除图片
    router.delete('/:id', require('./handlers/delete'));

    // 更新素材
    router.post('/:id', require('./handlers/update'));
};