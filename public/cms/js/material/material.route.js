(function() {

    'use strict';

    angular
        .module('app.material')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.material',
                config: {
                        url: '^/material',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/material/materialList.html',
                                controller: 'MaterialController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'素材列表'
                    },
            },
            {
                state: 'root.material.create',
                config: {
                        url: '^/material/create',
                        views: {
                            'main@root': {
                                templateUrl: 'templates/material/createMaterial.html',
                                controller: 'MaterialController',
                                controllerAs: 'vm',
                            }
                        },
                        title:'编辑素材'
                    },
            }
        ];
    }
})();
