module.exports = (router) => {
    // 获取资源位列表
    router.get('/list', require('./handlers/list'));

    // 新建资源位
    router.get('/create', require('./handlers/create'));

    // 删除图片
    // router.post('/delete', require('./handlers/delete'));
};
