(function() {

    'use strict';

    angular
        .module("app.dashboard")
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http'];
    /* @nginject */
    function DashboardController($http) {

        var vm = this;
        vm.ready = false;
        vm.getData = getData;

        getData();

        /**
         * Get Data
         */
        function getData() {
            $http.get('/node/dashboard/count').success(function(data) {
                vm.materials_count      = data.materials_count;
                vm.resources_count      = data.resources_count;
                vm.plans_count  = data.plans_count;
                vm.ready = true;
            });
        }
    }

}());
