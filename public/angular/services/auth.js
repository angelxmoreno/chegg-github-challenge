"use strict";

(function () {
    function config(CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 15 * 60 * 1000
        });
    }

    function service($q, CacheFactory) {
        const CACHE_NAME = 'userCache';

        if (!CacheFactory.get(CACHE_NAME)) {
            CacheFactory.createCache(CACHE_NAME, {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000,
                storageMode: 'sessionStorage'
            });
        }

        const cache = CacheFactory.get(CACHE_NAME);

        return {
            getApiKey: function () {
                return cache.get('/api_key');
            },
            setApiKey: function (api_key) {
                return cache.put('/api_key', api_key);
            },
            validateUser: function () {
                let deferred = $q.defer();
                let api_key = this.getApiKey();

                if (angular.isDefined(api_key)) {
                    deferred.resolve(api_key);
                } else {
                    deferred.reject('no api_key found');
                }

                return deferred.promise;
            }
        };
    }

    angular
            .module('auth', [
                'angular-cache'
            ])
            .config(config)
            .service('AuthService', ['$q', 'CacheFactory', service]);
})();