module.exports = (router) => {
    // 登录
    router.post('/login', require('./handlers/login'));
};
