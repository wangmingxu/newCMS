"use strict";
const RouterBase = require('../../../common/routerbase');
const fs = require('fs');
const path = require('path');

class UserLogin extends RouterBase {
    handle() {
      let {username,password} = this.req.body;
      let userList = JSON.parse(fs.readFileSync(path.join(global.SERVER_ROOT,'models/user.json')));
      let validUser = userList.filter((item)=>{
        return item.username === username  && item.password === password;
      });
      if(validUser.length>0){
        this.req.session.user = validUser[0];
        this.result.code = 1;
        this.result.msg = '登录成功';
      }else{
        this.result.msg = '登录失败';
        this.res.status(403);
      }
      this.res.json(this.result);
    }
}

module.exports = UserLogin.makeRouteHandler();
