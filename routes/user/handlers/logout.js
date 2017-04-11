"use strict";
const RouterBase = require('../../../common/routerbase');
const fs = require('fs');
const path = require('path');

class UserLogout extends RouterBase {
    handle() {
        this.req.session.destroy((err)=>{
          this.res.redirect('/');
        });
    }
}

module.exports = UserLogout.makeRouteHandler();
