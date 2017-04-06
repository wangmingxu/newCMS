(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Material", Material);

    Material.$inject = ['$resource'];
    /* @ngInject */
    function Material($resource) {
        return $resource('/node/material/:id', {id: '@_id'},{query: {method: 'get', isArray: false}});
    }

}());
