module.exports = (router) => {
    // 获取资源位列表
    router.get('/list', require('./handlers/list'));

    // 新建资源位
    router.post('/create', require('./handlers/create'));

    // 查找资源位
    router.get('/:id', require('./handlers/detail'));

    // 删除图片
    router.post('/delete', require('./handlers/delete'));
};
