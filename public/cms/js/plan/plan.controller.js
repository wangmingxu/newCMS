(function() {

    'use strict';

    angular.module("app.plan").controller('PlanController', PlanController);

    PlanController.$inject = ['$http', '$stateParams', '$filter', 'Plan', 'Resource', '$state'];
    /* @nginject */
    function PlanController($http, $stateParams, $filter, Plan, Resource, $state) {

        var vm = this;
        vm.plan = {};
        vm.now = Date.now();
        vm.getData = getData;
        vm.createPlan = createPlan;
        vm.getResource = getResource;
        vm.getPlan = getPlan;
        vm.changeEditMode = changeEditMode;
        vm.updatePlan = updatePlan;
        vm.delPlan = delPlan;
        vm.toggleStatus = toggleStatus;

        /**
         * Get List
         */
        function getData(page) {
            vm.ready = false;
            var params = {};
            if(vm.plan.effective!=='' && vm.plan.effective!==undefined){
              params.effective = vm.plan.effective;
            }
            if(page!==undefined){
                params.page = page;
            }
            var list = Plan.query(params,function(){
                vm.list = list.data;
                vm.totalPage = list.totalPage;
                vm.page = list.page;
                vm.totalNum = list.totalNum;
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
            var newPlan = new Plan(data);
            newPlan.$save(function(){
              Materialize.toast('创建计划成功!', 4000);
              setTimeout(function(){
                $state.go('root.plan');
              },1000);
            });
        }

        /**
         * Get Plan By Id
         */
        function getPlan() {
            vm.ready = false;
            Plan.get({id:$stateParams.id},function(data){
                vm.plan = data;
                vm.plan.startTime = new Date(vm.plan.startTime);
                vm.plan.endTime = new Date(vm.plan.endTime);
                vm.plan.interface = JSON.parse(vm.plan.interface);
                vm.ready = true;
            });
        }

        function changeEditMode() {
            vm.options.mode = vm.options.mode == 'form'
                ? 'code'
                : 'form';
        }

        /**
         * Delete Plan
         */
        function delPlan(id) {
            Plan.get({id:id},function(plan){
                plan.$delete({id:id},function(){
                  Materialize.toast('删除计划成功', 4000);
                  vm.getData();
                });
            });
        }

        /**
         * Update Plan
         */
        function updatePlan() {
            Plan.get({id:$stateParams.id},function(plan){
                angular.extend(plan,vm.plan);
                plan.$save({id:$stateParams.id},function(){
                  Materialize.toast('更新素材成功', 4000);
                  vm.getPlan();
                });
            });
        }

        function toggleStatus(planId,effective) {
          Plan.get({id:planId},function(plan){
              plan.effective = effective;
              plan.$save({id:planId},function(){
                Materialize.toast('修改计划状态成功', 4000);
                vm.getData();
              });
          });
        }

    }

}());
