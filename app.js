"use strict";

require('babel-polyfill');
require('./globals');
var express = require('express');
var app = express();
var config = require('./config');
var app_port = process.env.VCAP_APP_PORT || config.port;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// 设置静态资源目录
app.use("/", express.static(global.STATIC_ROOT));

app.use("/upload", express.static(global.UPLOAD_ROOT));

// 记录请求日志
app.use(morgan('tiny'));

// parse `application/x-www-form-urlencoded`
app.use(bodyParser.urlencoded({ extended: true }));

// parse `application/json`
app.use(bodyParser.json({ limit: '5mb' }));

// parse cookie
app.use(cookieParser());

// 开启session
app.use(session({
    secret: 'Qien',
    resave: true,
    saveUninitialized: false,
    cookie: {}
}));

// CORS配置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

// orm同步数据库中间件
app.use(require('./middlewares/orm_sync'));

// 登录认证中间件
app.use(require('./middlewares/Auth'));

// 业务逻辑分发路由中间件
app.use(require('./middlewares/route_dispatcher'));

//删除所有与模型相关的数据表
app.get('/resetModel', function (req, res) {
    req.db.drop(function (err) {
        if (err) throw err;
        res.end("删除成功");
    });
});

// 查看环境变量
app.get('/env', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

    res.write("System Environment:\n\n");
    for (var env in process.env) {
        res.write(env + ": " + process.env[env] + "\n");
    }

    res.end();
});

// 打印异常日志
process.on('uncaughtException', function (error) {
    console.log(error);
});

var server = app.listen(app_port, function () {
    console.log('Listening on port %d', server.address().port);
});
