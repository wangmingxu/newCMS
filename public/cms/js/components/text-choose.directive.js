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
          $(document).on('blur', '.jsoneditor-value', function(e) {
              window.editEle = e.currentTarget;
          });
          $http.get('/node/material/list?materialType=text').success(function(data) {
              scope.list = data;
          });
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
