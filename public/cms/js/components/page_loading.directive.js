(function() {

    'use strict';

    angular.module('app.components').directive("pageLoading", pageLoading);

    function pageLoading() {
        var directive = {
            restrict: "E",
            scope: {},
            template: '<div class="preloader-wrapper active">' + '    <div class="spinner-layer spinner-red-only">' + '      <div class="circle-clipper left">' + '        <div class="circle"></div>' + '      </div><div class="gap-patch">' + '        <div class="circle"></div>' + '      </div><div class="circle-clipper right">' + '        <div class="circle"></div>' + '      </div>' + '    </div>' + '  </div>'
        };

        return directive;
    }

}());
