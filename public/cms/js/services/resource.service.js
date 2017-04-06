(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Resource", Resource);

    Resource.$inject = ['$resource'];
    /* @ngInject */
    function Resource($resource) {
        return $resource('/node/resource/:id', {id: '@_id'});
    }

}());
