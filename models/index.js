'use strict';

var fs = require('fs');
var path = require('path');
fs.readdir(__dirname, function (err, files) {
    files.map(function (file) {
        fs.stat(path.join(__dirname, file), function (err, stats) {
            //把所有models里面的目录的当作模型导出
            if (stats.isDirectory()) {
                exports[file] = require(path.join(__dirname, file));
            }
        });
    });
});