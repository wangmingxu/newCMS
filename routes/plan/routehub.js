module.exports = (router) => {
    // 获取计划
    router.get('/list', require('./handlers/list'));

    // 新增计划
    router.post('/create', require('./handlers/create'));

    // 查找计划
    router.get('/:id', require('./handlers/detail'));

    // 删除计划
    router.post('/delete', require('./handlers/delete'));
};
