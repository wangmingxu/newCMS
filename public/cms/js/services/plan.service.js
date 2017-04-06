(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Plan", Plan);

    Plan.$inject = ['$resource'];
    /* @ngInject */
    function Plan($resource) {
        return $resource('/node/plan/:id', {id: '@_id'},{query: {method: 'get', isArray: false}});
    }

}());
