"use strict";

(function () {
    const name = 'issuesList';

    function Controller($stateParams, GitHubService, AuthService) {
        this.repo_id = $stateParams.org + '/' + $stateParams.repo;

        GitHubService.setToken(AuthService.getApiKey());

        GitHubService.issues(this.repo_id).then((issues) => {
            console.log('issues', issues);
            this.list = issues;
        });

        GitHubService.collaborators(this.repo_id).then((collaborators) => {
            console.log('collaborators', collaborators);
            this.collaborators = collaborators;
        });

    }

    const componentConfig = {
        templateUrl: `/views/${name}.html`,
        controller: ['$stateParams', 'GitHubService', 'AuthService', Controller],
        bindings: {}
    };

    angular
            .module('GApp')
            .component(name, componentConfig);
})();