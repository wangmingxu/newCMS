const ueditor = require('./handler');
const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  router.use("/dispatcher", ueditor(global.UPLOAD_ROOT, function (req, res, next) {
      //客户端上传文件设置
      var imgDir = '/ueditor/';
      var ActionType = req.query.action;
      if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
          var file_url = imgDir;//默认图片上传地址
          /*其他上传格式的地址*/
          if (ActionType === 'uploadfile') {
              file_url = '/file/ueditor/'; //附件
          }
          if (ActionType === 'uploadvideo') {
              file_url = '/video/ueditor/'; //视频
          }
          res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
          res.setHeader('Content-Type', 'text/html');
      }
      //  客户端发起图片列表请求
      else if (req.query.action === 'listimage') {
          var dir_url = imgDir;
          res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
      }
      // 客户端发起其它请求
      else {
          var configJson = JSON.parse(fs.readFileSync(path.join(global.SERVER_ROOT,'public/cms/lib/ueditor/nodejs/config.json')));
          res.jsonp(configJson);
      }
  }));
};
