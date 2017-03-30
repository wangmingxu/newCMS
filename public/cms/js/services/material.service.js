(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Material", Material);

    Material.$inject = ['$http'];
    /* @ngInject */
    function Material($http) {
        // return $resource('/admin/api/posts/:id', {id: '@_id'}, {
        //     update: {
        //         method: 'PUT'
        //     }
        // });
    }

}());
