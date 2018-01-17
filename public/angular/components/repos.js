"use strict";

(function () {
    const name = 'repos';

    function Controller(GitHubService, AuthService) {
        GitHubService.setToken(AuthService.getApiKey());
        
        GitHubService.repos().then((repos) => {
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