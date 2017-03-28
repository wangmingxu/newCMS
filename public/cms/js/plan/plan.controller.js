(function() {

    'use strict';

    angular
        .module("app.plan")
        .controller('PlanController', PlanController);

    PlanController.$inject = ['$http'];
    /* @nginject */
    function PlanController($http) {

        var vm = this;
        vm.ready = true;
        vm.getData = getData;

        getData();

        /**
         * Get Data
         */
        function getData() {
            // $http.get('/admin/api/dashboard').success(function(res) {
            //     vm.users_count      = res.users_count;
            //     vm.posts_count      = res.posts_count;
            //     vm.galleries_count  = res.galleries_count;
            //     vm.ready = true;
            // });
        }
    }

}());
