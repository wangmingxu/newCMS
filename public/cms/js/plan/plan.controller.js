(function() {

    'use strict';

    angular.module("app.plan").controller('PlanController', PlanController);

    PlanController.$inject = ['$http', '$scope', '$stateParams', '$filter'];
    /* @nginject */
    function PlanController($http, $scope, $stateParams, $filter) {

        var vm = this;
        vm.plan = {};
        vm.getData = getData;
        vm.createPlan = createPlan;
        vm.getResource = getResource;
        vm.getPlan = getPlan;
        vm.changeEditMode = changeEditMode;
        /**
         * Get List
         */
        function getData() {
            vm.ready = false;
            $http.get('/node/plan/list').success(function(data) {
                vm.list = data;
                vm.ready = true;
            });
        }

        /**
         * Get Resource By id
         */
        function getResource() {
            vm.ready = false;
            $http.get('/node/resource/' + $stateParams.id).success(function(data) {
                vm.resource = data;
                vm.resource.interface = JSON.parse(vm.resource.interface);
                vm.plan.interface = angular.copy(vm.resource.interface);
                vm.ready = true;
            });
        }

        /**
         * Create Plan
         */
        function createPlan() {
            vm.plan.startTime = $filter("date")(vm.plan.startTime, "yyyy-MM-dd HH:mm:ss");
            vm.plan.endTime = $filter("date")(vm.plan.endTime, "yyyy-MM-dd HH:mm:ss");
            var data = angular.extend(vm.plan, {resource_id: vm.resource.id});
            $http({method: 'POST', url: '/node/plan/create', data: data}).then(function successCallback(data, status, headers, config) {
                Materialize.toast('创建计划成功', 4000);
            }, function errorCallback(data, status, headers, config) {
                Materialize.toast('创建资源位失败', 4000);
            });
        }

        /**
         * Create Plan
         */
        function getPlan() {
            vm.ready = false;
            $http.get('/node/plan/' + $stateParams.id).success(function(data) {
                vm.plan = data;
                vm.plan.startTime = new Date(vm.plan.startTime);
                vm.plan.endTime = new Date(vm.plan.endTime);
                vm.plan.resource.interface = JSON.parse(vm.plan.resource.interface);
                vm.ready = true;
            });
        }

        function changeEditMode(){
            vm.options.mode = vm.options.mode=='form'?'code':'form';
        }

    }

}());
