'use strict';

var Busboy = require('busboy');
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');
var snowflake = require('node-snowflake').Snowflake;
var config = require('../../config');
var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

var ueditor = function ueditor(static_url, handel) {
  return function (req, res, next) {
    var _respond = respond(static_url, handel);
    _respond(req, res, next);
  };
};
var respond = function respond(static_url, callback) {
  return function (req, res, next) {
    if (req.query.action === 'config') {
      callback(req, res, next);
      return;
    } else if (req.query.action === 'listimage') {
      res.ue_list = function (list_dir) {
        var str = '';
        var i = 0;
        var list = [];
        fs.readdir(static_url + list_dir, function (err, files) {
          if (err) throw err;

          var total = files.length;
          files.forEach(function (file) {

            var filetype = 'jpg,png,gif,ico,bmp';
            var tmplist = file.split('.');
            var _filetype = tmplist[tmplist.length - 1];
            if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
              var temp = {};
              temp.url = config.qiniu.imageUrlPrefix + file;
              list[i] = temp;
            } else {}
            i++;
            // send file name string when all files was processed
            if (i === total) {
              res.json({
                "state": "SUCCESS",
                "list": list,
                "start": 1,
                "total": total
              });
            }
          });
        });
      };
      callback(req, res, next);
    } else if (req.query.action === 'uploadimage' || req.query.action === 'uploadfile' || req.query.action === 'uploadvideo') {
      var busboy = new Busboy({
        headers: req.headers
      });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        req.ueditor = {};
        req.ueditor.fieldname = fieldname;
        req.ueditor.file = file;
        req.ueditor.filename = filename;
        req.ueditor.encoding = encoding;
        req.ueditor.mimetype = mimetype;
        res.ue_up = function (img_url) {
          var tmpdir = path.join(os.tmpdir(), path.basename(filename));
          var name = snowflake.nextId() + path.extname(tmpdir);
          var uploadDir = path.join(static_url, img_url);
          if (!fs.existsSync(uploadDir)) {
            fs.mkdir(uploadDir);
          }
          var dest = path.join(static_url, img_url, name);
          var writeStream = fs.createWriteStream(tmpdir);
          file.pipe(writeStream);
          writeStream.on("close", function () {
            fse.move(tmpdir, dest, function (err) {
              if (err) throw err;
              var token = new qiniu.rs.PutPolicy(config.qiniu.bucket + ":" + name).token();
              var extra = new qiniu.io.PutExtra();
              qiniu.io.putFile(token, name, dest, extra, function (err, ret) {
                if (!err) {
                  // 上传成功， 处理返回值
                  res.json({
                    'url': config.qiniu.imageUrlPrefix + name,
                    'title': req.body.pictitle,
                    'original': filename,
                    'state': 'SUCCESS'
                  });
                } else {
                  // 上传失败， 处理返回代码
                  console.log(err);
                }
              });
            });
          });
        };
        callback(req, res, next);
      });
      req.pipe(busboy);
    } else {
      callback(req, res, next);
    }
    return;
  };
};
module.exports = ueditor;