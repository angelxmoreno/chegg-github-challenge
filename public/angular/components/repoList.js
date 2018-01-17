"use strict";

(function () {
    const name = 'repoList';

    function Controller(GitHubService, AuthService) {
        GitHubService.setToken(AuthService.getApiKey());
        
        GitHubService.repos().then((repos) => {
            console.log(repos);
            this.list = repos;
        });
    }

    const componentConfig = {
        templateUrl: `/views/${name}.html`,
        controller: ['GitHubService', 'AuthService', Controller],
        bindings: {}
    };

    angular
            .module('GApp')
            .component(name, componentConfig);
})();