(function() {

    'use strict';

    angular
        .module('app.plan')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.plan',
                config: {
                        url: '^/plan',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/plan/onlinePlanList.html',
                                controller: 'PlanController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'计划列表'
                    },
            },
            {
                state: 'root.plan.create',
                config: {
                        url: '^/resource/:id/plan/create',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/plan/createPlan.html',
                                controller: 'PlanController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'资源位-新建计划'
                    },
            },
            {
                state: 'root.plan.edit',
                config: {
                        url: '^/plan/:id',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/plan/editPlan.html',
                                controller: 'PlanController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'资源位-新建计划'
                    },
            },
        ];
    }
})();
