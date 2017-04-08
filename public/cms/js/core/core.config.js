(function() {

    'use strict';

    angular
        .module('app.core')
        .config(aHrefSafe)
        .config(httpInterceptor);

    aHrefSafe.$inject = ['$compileProvider'];
    httpInterceptor.$inject = ['$httpProvider'];
    /* @ngInject */
    function aHrefSafe($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms|data):/);
    }

    function httpInterceptor($httpProvider) {
        $httpProvider.interceptors.push('UserInterceptor');
    }

}());
