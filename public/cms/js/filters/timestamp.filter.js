(function() {

    'use strict';

    angular
        .module('app.filters')
        .filter('dateVal', dateVal);

    function dateVal() {
        return function(date) {

            return new Date(date).getTime();
        }
    }

}());
