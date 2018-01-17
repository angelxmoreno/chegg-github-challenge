"use strict";

(function () {
    const GITHUB_URL = 'https://api.github.com';

    function config(CacheFactoryProvider) {
        angular.extend(CacheFactoryProvider.defaults, {
            maxAge: 5 * 1000
        });
    }

    function service($http, $q, CacheFactory) {
        const CACHE_NAME = 'githubCache';

        if (!CacheFactory.get(CACHE_NAME)) {
            CacheFactory.createCache(CACHE_NAME, {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000,
                storageMode: 'memory'
            });
        }

        const cache = CacheFactory.get(CACHE_NAME);

        this.token = undefined;

        this.ping = () => {
            console.log('pong');
        };

        this.setToken = (token) => {
            this.token = token;
        };

        this.user = () => {
            return this.callApi('/user');
        };

        this.repos = () => {
            return this.callApi('/user/repos');
        };

        this.issues = (repo_id) => {
            return this.callApi(`/repos/${repo_id}/issues`);
        };

        this.collaborators = (repo_id) => {
            return this.callApi(`/repos/${repo_id}/collaborators`)
        };

        this.callApi = (uri) => {
            if (cache.get(uri)) {
                console.log('cache.get(uri)', cache.get(uri))
                return $q.when(cache.get(uri));
            }

            return $http({
                method: 'GET',
                url: GITHUB_URL + uri,
                params: {
                    access_token: this.token
                }
            }).then((response) => {
                cache.put(uri, response.data)
                return response.data;
            });
        }
    }

    angular
            .module('github', [
                'angular-cache'
            ])
            .config(config)
            .service('GitHubService', ['$http', '$q', 'CacheFactory', service]);
})();