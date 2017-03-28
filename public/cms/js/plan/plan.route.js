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
                state: 'root.planList',
                config: {
                        url: '/planList',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/plan/planList.html',
                                controller: 'PlanController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'计划列表'
                    },
            }
        ];
    }
})();
