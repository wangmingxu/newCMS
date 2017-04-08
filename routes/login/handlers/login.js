"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterBase = require('../../../common/routerbase');
var fs = require('fs');
var path = require('path');

var UserLogin = function (_RouterBase) {
  _inherits(UserLogin, _RouterBase);

  function UserLogin() {
    _classCallCheck(this, UserLogin);

    return _possibleConstructorReturn(this, (UserLogin.__proto__ || Object.getPrototypeOf(UserLogin)).apply(this, arguments));
  }

  _createClass(UserLogin, [{
    key: 'handle',
    value: function handle() {
      var _req$body = this.req.body,
          username = _req$body.username,
          password = _req$body.password;

      var userList = JSON.parse(fs.readFileSync(path.join(global.SERVER_ROOT, 'models/user.json')));
      var validUser = userList.filter(function (item) {
        return item.username === username && item.password === password;
      });
      if (validUser.length > 0) {
        this.req.session.user = validUser[0];
        this.result.code = 1;
        this.result.msg = '登录成功';
      } else {
        this.result.msg = '登录失败';
        this.res.status(403);
      }
      this.res.json(this.result);
    }
  }]);

  return UserLogin;
}(RouterBase);

module.exports = UserLogin.makeRouteHandler();