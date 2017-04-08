(function() {

    'use strict';

    angular
    .module('app.core')
    .factory('UserInterceptor', UserInterceptor)

    UserInterceptor.$inject = ['$q', '$rootScope', '$location'];
    /* @ngInject */
    function UserInterceptor($q, $rootScope, $location) {
        return {
            'responseError': function(response) {
                var data = response.data;
                if(data.code === 0){
                  $location.path('/login');
                }
                return $q.reject(response);
            },
            'response': function(response) {
                // console.log(response);
                return response;
            },
            'request': function(config) {
                //......
                return config;
            },
            'requestError': function(config) {
                //......
                return $q.reject(config);
            }
        };
    }

}());
