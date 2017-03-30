(function() {

    'use strict';

    angular.module("app.material").controller('MaterialController', MaterialController);

    MaterialController.$inject = ['$http'];
    /* @nginject */
    function MaterialController($http) {
        var vm = this;
        vm.ready = false;
        vm.typeFilter = 'image'
        vm.getData = getData;
        vm.uploadText = uploadText;
        vm.uploadImage = uploadImage;

        /**
         * Get Data
         */
        function getData() {
            $http.get('/node/material/list?materialType='+vm.typeFilter).success(function(data) {
                vm.list = data;
                vm.ready = true;
            });
        }

        /**
         * Upload TextMaterial
         */
        function uploadText() {
            var content = window.ue.getContent();
            $http({
                method: 'POST',
                url: '/node/material/uploadText',
                data: {
                    content: content,
                    materialName: vm.material.materialName
                }
            }).then(function successCallback(data, status, headers, config) {
              Materialize.toast('上传素材成功!', 4000)
            }, function errorCallback(data, status, headers, config) {
              Materialize.toast('上传素材失败!', 4000)
            });
        }

        /**
         * Upload ImageMaterial
         */
        function uploadImage() {
          vm.loading = true;
            $http({
                method: 'POST',
                url: '/node/material/uploadImage',
                data: vm.material.files
            }).then(function successCallback(data, status, headers, config) {
              Materialize.toast('上传素材成功!', 4000);
              vm.material.files = [];
              vm.loading = false;
            }, function errorCallback(data, status, headers, config) {
              Materialize.toast('上传素材失败!', 4000);
              vm.loading = false;
            });
        }
    }

}());
