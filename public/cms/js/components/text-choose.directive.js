(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("textChoose", textChoose);

    textChoose.$inject = ['$http'];
    /* @ngInject */
    function textChoose($http) {
        var directive = {
            restrict: "EAC",
            scope: {
                choose: '='
            },
            templateUrl: '../../templates/components/textChoose.html',
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
          $(element).find('.modal').modal();
          // $(element).hide();
          $(document).on('blur', '.jsoneditor-value', function(e) {
              window.editEle = e.currentTarget;
          });
          // $(document).on('focus', '.jsoneditor-value', function(e) {
          //     $(element).show();
          // });
          scope.getList = function(page) {
              var params = {};
              params.materialType = 'text';
              if (page !== undefined) {
                  params.page = page;
              }
              $http({method: 'GET', url: '/node/material', params: params}).then(function successCallback(data, status, headers, config) {
                  scope.list = data.data.data;
                  scope.totalPage = data.data.totalPage;
                  scope.perpage = data.data.perpage;
                  scope.page = data.data.page;
              }, function errorCallback(data, status, headers, config) {
                  console.log("error");
              });
          };
          scope.getList();
          scope.selectText = function(item){
            scope.choose = item;
          };
          scope.insertText = function(){
            window.editEle.innerHTML = _.escape(scope.choose.content);
            $(window.editEle).focus().blur().focus();
          };
        }
    }

}());
