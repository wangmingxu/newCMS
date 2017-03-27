(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.dashboard',
                config: {
                        url: '/dashboard',
                        views: {
                            'main': {
                                templateUrl: 'templates/dashboard/dashboard.html',
                                // controller:'dashboardCtrl'
                            }
                        },
                        title:'Dashboard'
                    },
            }
        ];
    }
})();
