"use strict";

(function () {
    function config(CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 15 * 60 * 1000
        });
    }

    angular
            .module('GApp', [
                'routes',
                'auth',
                'github',
                'angularMoment'
            ])
            .config(config);
})();
