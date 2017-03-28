(function() {

    'use strict';

    angular
        .module("app.material")
        .controller('MaterialController', MaterialController);

    MaterialController.$inject = ['$http'];
    /* @nginject */
    function MaterialController($http) {
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
