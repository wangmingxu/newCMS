module.exports = (router) => {
    // 获取计划
    router.get('/list', require('./handlers/list'));

    // 新增计划
    router.get('/create', require('./handlers/create'));

    // 删除计划
    // router.post('/delete', require('./handlers/delete'));
};
