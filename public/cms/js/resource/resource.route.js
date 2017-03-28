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
                state: 'root.resourceList',
                config: {
                        url: '/resourceList',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/resource/resourceList.html',
                                controller: 'ResourceController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'资源位列表'
                    },
            }
        ];
    }
})();
