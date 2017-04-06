(function() {

    'use strict';

    angular.module('app.components').directive("ueditor", createScript);

    function createScript() {
        var directive = {
            restrict: "EA",
            scope: false,
            link: function(scope, elem, attr) {
                if(window.ue){
                  UE.getEditor('UEcontainer').destroy();
                }
                window.ue = UE.getEditor('UEcontainer');
            }
        };

        return directive;
    }

}());
