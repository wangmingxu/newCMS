"use strict";
const _ = require('lodash');
const path = require('path');
const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');

class ListImages extends RouterBase {
    handle() {
      this.res.json({
          code: 0,
          msg: 'ok'
      });
    }
}

module.exports = ListImages.makeRouteHandler();
