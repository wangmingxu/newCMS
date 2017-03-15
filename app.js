var express = require('express'),
    app = express(),
    app_port = process.env.VCAP_APP_PORT || 3000;

var mysql = require('mysql');
var mysqlConfig;
if(process.env.NODE_ENV=="TEST"){
  mysqlConfig = require('./config-test');
  console.log("env now is " + process.env.NODE_ENV);
}else{
  mysqlConfig = require('./config-prod');
  console.log("env now is product");
}
var connection = mysql.createConnection(mysqlConfig);
connection.connect();

app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.get('/node/annualbill', function(req, res){
    var orgId = req.query.orgId;
    var result = {};
    //查询年度统计
    connection.query('SELECT * FROM btlbill_2016 WHERE orgId='+orgId, function(err, rows, fields) {
        if (err) throw err;
        result.btlbill = rows[0];
        //查询修车品牌
        connection.query('SELECT * FROM btlbill_2016_btrbrand WHERE orgId='+orgId+' ORDER BY ps DESC LIMIT 4;', function(err, rows, fields) {
            if (err) throw err;
            result.brand = rows;
            res.json(result);
        });
    });
});

app.get('/node/env', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});

  res.write("System Environment:\n\n");
  for(var env in process.env) {
    res.write(env + ": " + process.env[env] + "\n");
  }

  res.end();
});

var server = app.listen(app_port, function(req, res){
  console.log('Listening on port %d', server.address().port);
});
