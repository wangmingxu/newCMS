(function() {

    'use strict';

    angular.module("app.resource").controller('ResourceController', ResourceController);

    ResourceController.$inject = ['$http', '$stateParams', 'Resource', 'Plan'];
    /* @nginject */
    function ResourceController($http, $stateParams, Resource, Plan) {
        var vm = this;
        vm.getList = getList;
        vm.now = Date.now();
        vm.createResource = createResource;
        vm.getResource = getResource;
        vm.delResource = delResource;
        vm.updateResource = updateResource;
        vm.toggleStatus = toggleStatus;
        vm.options = {
            mode: 'code',
            modes: ['form', 'text', 'tree', 'view','code'],
        };

        /**
         * Get Data
         */
        function getList() {
            vm.ready = false;
            var list = Resource.query(function(){
                vm.list = list;
                vm.ready = true;
            });
        }

        /**
         * Get Resource By Id
         */
        function getResource() {
            vm.ready = false;
            Resource.get({id:$stateParams.id},function(data){
                vm.resource = data;
                vm.resource.interface = JSON.parse(vm.resource.interface);
                vm.ready = true;
            });
        }

        /**
         * Create Resource
         */
        function createResource() {
            var newResource = new Resource(vm.resource);
            newResource.$save(function(){
              Materialize.toast('创建资源位成功!', 4000);
            });
        }

        /**
         * Delete Resource
         */
        function delResource(id) {
            Resource.get({id:id},function(resource){
                resource.$delete({id:id},function(){
                  Materialize.toast('删除资源位成功', 4000);
                  vm.getList();
                });
            });
        }

        function updateResource(){
            Resource.get({id:$stateParams.id},function(resource){
                angular.extend(resource,vm.resource);
                resource.$save({id:$stateParams.id},function(){
                  Materialize.toast('修改资源位成功', 4000);
                  vm.getResource();
                });
            });
        }

        function toggleStatus(planId,effective) {
            Plan.get({id:planId},function(plan){
                plan.effective = effective;
                plan.$save({id:planId},function(){
                  Materialize.toast('修改计划状态成功', 4000);
                  vm.getResource();
                });
            });
        }
    }

}());
