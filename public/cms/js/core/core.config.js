(function() {

    'use strict';

    angular
        .module('app.core')
        .config(aHrefSafe);

    aHrefSafe.$inject = ['$compileProvider'];
    /* @ngInject */
    function aHrefSafe($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms|data):/);
    }

}());
