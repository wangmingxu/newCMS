(function() {

    'use strict';

    angular
        .module('app.resource')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.resource',
                config: {
                        url: '^/resource',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/resource/resourceList.html',
                                controller: 'ResourceController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'资源位列表'
                    },
            },
            {
                state: 'root.resource.create',
                config: {
                        url: '^/resource/create',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/resource/createResource.html',
                                controller: 'ResourceController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'新建资源位'
                    },
            },
            {
                state: 'root.resource.edit',
                config: {
                        url: '^/resource/:id',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/resource/editResource.html',
                                controller: 'ResourceController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'编辑资源位'
                    },
            },
            {
                state: 'root.resource.plan',
                config: {
                        url: '^/resource/:id/plan',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/resource/resource-planList.html',
                                controller: 'ResourceController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'资源位-计划'
                    },
            },
        ];
    }
})();
