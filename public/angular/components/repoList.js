"use strict";

(function () {
    const name = 'repoList';

    function Controller(AuthService) {
        this.list = [
            {
                name: 'Repo One'
            },
            {
                name: 'Repo Two'
            }
        ]
    }

    const componentConfig = {
        templateUrl: `/views/${name}.html`,
        controller: ['AuthService', Controller],
        bindings: {}
    };

    angular
            .module('GApp')
            .component(name, componentConfig);
})();