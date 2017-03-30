(function() {

    'use strict';

    angular.module("app.resource").controller('ResourceController', ResourceController);

    ResourceController.$inject = ['$http', '$stateParams', '$scope', '$timeout'];
    /* @nginject */
    function ResourceController($http, $stateParams, $scope, $timeout) {
        var vm = this;
        vm.getList = getList;
        vm.createResource = createResource;
        vm.getResource = getResource;
        vm.delResource = delResource;
        vm.options = {
            mode: 'code',
            modes: ['form', 'text', 'tree', 'view','code'],
        };

        /**
         * Get Data
         */
        function getList() {
            vm.ready = false;
            $http.get('/node/resource/list').success(function(data) {
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
                vm.ready = true;
            });
        }

        /**
         * Create Resource
         */
        function createResource() {
            $http({method: 'POST', url: '/node/resource/create', data: vm.resource}).then(function successCallback(data, status, headers, config) {
                Materialize.toast('创建资源位成功', 4000);
            }, function errorCallback(data, status, headers, config) {
                Materialize.toast('创建资源位失败', 4000);
            });
        }

        /**
         * Delete Resource
         */
        function delResource(id) {
            $http({
                method: 'POST',
                url: '/node/resource/delete',
                data: {
                    resourceId: id
                }
            }).then(function successCallback(data, status, headers, config) {
                Materialize.toast('删除资源位成功', 4000);
                vm.getList();
            }, function errorCallback(data, status, headers, config) {
                Materialize.toast('删除资源位失败', 4000);
            });
        }

        /**
         * Success response
         */
        function _successResponse(successMessage) {
            vm.errors = '';
            vm.flash = successMessage;
            vm.loading = false;
            $timeout(function() {
                vm.flash = false;
            }, 5000);
        }

        /**
         * Errors response
         */
        function _errorResponse(flashError) {
            vm.loading = false;
            vm.flashError = flashError;
            $timeout(function() {
                vm.flashError = false;
            }, 5000);
        }
    }

}());
