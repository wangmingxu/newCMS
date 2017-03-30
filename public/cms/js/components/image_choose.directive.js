(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("imageChoose", imageChoose);

    imageChoose.$inject = ['$http'];
    /* @ngInject */
    function imageChoose($http) {
        var directive = {
            restrict: "EAC",
            scope: {
                choose: '='
            },
            templateUrl: '../../templates/components/imageChoose.html',
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
          $(element).find('.modal').modal();
          $(document).on('blur', '.jsoneditor-value', function(e) {
              window.editEle = e.currentTarget;
          });
          $http.get('/node/material/list?materialType=image').success(function(data) {
              scope.list = data;
          });
          scope.selectImage = function(item){
            scope.choose = item;
          };
          scope.insertImage = function(){
            window.editEle.innerHTML = scope.choose.content;
            $(window.editEle).focus().blur().focus();
          };
        }
    }

}());
