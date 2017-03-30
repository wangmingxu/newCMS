module.exports = (router) => {
    // 获取图片列表
    router.get('/list', require('./handlers/list'));

    // 上传图片
    router.post('/uploadImage', require('./handlers/upload-base64'));

    // 上传文本
    router.post('/uploadText', require('./handlers/upload-text'));

    // 删除图片
    router.post('/delete', require('./handlers/delete'));
};
