(function() {

    'use strict';

    angular
        .module("app.login")
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$state'];
    /* @nginject */
    function LoginController($http, $state) {

        var vm = this;
        vm.user = {};
        vm.login = login;

        /**
         * Login
         */
        function login() {
            $http.post('/node/login', vm.user)
                .success(function (res) {
                    $state.go('root.dashboard');
                })
                .error(function(res) {
                    vm.error = res.msg;
                });
        }

    }

}());
