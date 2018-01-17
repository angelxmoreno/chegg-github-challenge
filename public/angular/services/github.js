"use strict";

(function () {
    const GITHUB_URL = 'https://api.github.com';

    function config(CacheFactoryProvider) {
    }

    function service($http, $q, CacheFactory) {

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
            return $http({
                method: 'GET',
                url: GITHUB_URL + uri,
                params: {
                    access_token: this.token
                }
            }).then((response) => {
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