(function() {

    'use strict';

    angular.module('app.filters').filter('numToArr', numToArr);

    function numToArr() {
        return function(num) {
            var array = [];
            for (var i = 0; i < num; i++) {
                array[i] = i + 1;
            }
            return array;
        }
    }

}());
