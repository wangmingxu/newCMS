(function() {

    'use strict';

    angular.module("app.material").controller('MaterialController', MaterialController);

    MaterialController.$inject = ['$http','$stateParams','Material'];
    /* @nginject */
    function MaterialController($http,$stateParams,Material) {
        var vm = this;
        vm.typeFilter = 'image';
        vm.getData = getData;
        vm.uploadText = uploadText;
        vm.uploadImage = uploadImage;
        vm.getMaterial= getMaterial;
        vm.updateMaterial = updateMaterial;
        vm.delMaterial = delMaterial;

        /**
         * Get Data
         */
        function getData(page) {
            vm.ready = false;
            var params = {};
            params.materialType = vm.typeFilter;
            if(page!==undefined){
                params.page = page;
            }
            var list = Material.query(params,function(){
                vm.list = list.data;
                vm.totalPage = list.totalPage;
                vm.page = list.page;
                vm.totalNum = list.totalNum;
                vm.ready = true;
            });
        }

        /**
         * Upload TextMaterial
         */
        function uploadText() {
            var content = window.ue.getContent();
            var params = {
                content: content,
                materialName: vm.material.materialName,
                materialType: 'text'
            };
            var newText = new Material(params);
            newText.$save(function(){
              Materialize.toast('上传素材成功!', 4000);
            });
        }

        /**
         * Upload ImageMaterial
         */
        function uploadImage() {
            vm.loading = true;
            var newImage = new Material({files:vm.material.files});
            newImage.$save(function(){
              vm.loading = false;
              Materialize.toast('上传素材成功!', 4000);
            });
        }

        /**
         * GET Material
         */
        function getMaterial() {
          Material.get({id:$stateParams.id},function(data){
              vm.material = data;
              setTimeout(function(){
                window.ue.setContent(data.content);
              },2000);
          });
        }

        /**
         * Delete Material
         */
        function delMaterial(id) {
            Material.get({id:id},function(material){
                material.$delete({id:id},function(){
                  Materialize.toast('删除素材成功', 4000);
                });
            });
        }

        /**
         * Update Material
         */
        function updateMaterial() {
            var content = window.ue.getContent();
            Material.get({id:$stateParams.id},function(material){
                material.content = content;
                material.materialName = vm.material.materialName;
                material.$save({id:$stateParams.id},function(){
                  Materialize.toast('更新素材成功', 4000);
                  vm.getMaterial();
                });
            });
        }
    }

}());
