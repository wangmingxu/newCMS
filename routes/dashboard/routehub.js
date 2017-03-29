module.exports = (router) => {
    // 统计
    router.get('/count', require('./handlers/count'));
};
