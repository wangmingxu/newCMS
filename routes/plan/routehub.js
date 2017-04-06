module.exports = (router) => {
    // 获取计划
    router.get('/', require('./handlers/list'));

    // 新增计划
    router.post('/', require('./handlers/create'));

    // 查找计划
    router.get('/:id', require('./handlers/detail'));

    // 删除计划
    router.delete('/:id', require('./handlers/delete'));

    // 更新计划
    router.post('/:id', require('./handlers/update'));
};
