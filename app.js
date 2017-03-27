"use strict";
require('./globals');
const express = require('express');
const app = express();
const config = require('./config');
const app_port = process.env.VCAP_APP_PORT || config.port;
const bodyParser = require('body-parser');
const morgan = require('morgan');

// 设置静态资源目录
app.use("/public",express.static(global.STATIC_ROOT));

app.use("/upload",express.static(global.UPLOAD_ROOT));

// 记录请求日志
app.use(morgan('tiny'));

// parse `application/x-www-form-urlencoded`
app.use(bodyParser.urlencoded({ extended: true }));

// parse `application/json`
app.use(bodyParser.json());

// CORS配置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

// orm同步数据库中间件
app.use(require('./middlewares/orm_sync'));

// 业务逻辑分发路由中间件
app.use(require('./middlewares/route_dispatcher'));


//删除所有与模型相关的数据表
app.get('/resetModel',(req,res) => {
    req.db.drop(function (err) {
      if (err) throw err;
      res.end("删除成功");
    });
});

// 查看环境变量
app.get('/node/env', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});

    res.write("System Environment:\n\n");
    for (var env in process.env) {
        res.write(env + ": " + process.env[env] + "\n");
    }

    res.end();
});

// 打印异常日志
process.on('uncaughtException', error => {
    console.log(error);
});

var server = app.listen(app_port, () => {
    console.log('Listening on port %d', server.address().port);
});
