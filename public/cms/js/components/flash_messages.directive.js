(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("flashMessage", flashMessage);

    function flashMessage() {
        var directive = {
            restrict: "E",
            templateUrl: '../../templates/components/flashMessage.html'
        };

        return directive;
    }

}());
