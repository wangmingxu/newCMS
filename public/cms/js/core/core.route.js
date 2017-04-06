(function() {

    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/dashboard';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state:'root',
                config:{
                    url: '',//'^/xxx'代表绝对路径
                    abstract: true, // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
                    views:{
                      'header@root':{
                        templateUrl:'templates/layout/header.html',
                      },
                      'sidebar@root':{
                        templateUrl:'templates/layout/sildebar.html'
                      },
                      '@':{
                        templateUrl:'templates/layout/master.html'
                      }
                    }
                }
            },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'templates/error/404.html',
                    title:'404'
                },
            },
        ];
    }

}());
