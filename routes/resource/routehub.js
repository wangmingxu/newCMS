module.exports = (router) => {
    // 获取资源位列表
    router.get('/', require('./handlers/list'));

    // 新建资源位
    router.post('/', require('./handlers/create'));

    // 查找资源位
    router.get('/:id', require('./handlers/detail'));

    // 删除资源位
    router.delete('/:id', require('./handlers/delete'));

    // 更新资源位
    router.post('/:id', require('./handlers/update'));

    // 汽配铺获取在线计划的内容
    router.get('/:id/output', require('./handlers/output'));
};
