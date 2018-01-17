"use strict";

(function () {
    const Routes = [
        {
            name: 'login',
            url: '/login',
            component: 'login',
        },
        {
            name: 'authView',
            abstract: true,
            resolve: {
                auth: ['$state','AuthService', validateUser]
            }
        },
        {
            name: 'repoList',
            url: '/repos',
            parent: 'authView',
            component: 'repoList',
        },
    ];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        Routes.forEach(function (route) {
            $stateProvider.state(route);
        });
    }

    function validateUser($state, AuthService) {
        return AuthService.validateUser().catch((err)=>{
            $state.go('login');
            throw err;
        });
    }

    angular
            .module('routes', [
                'ui.router'
            ])
            .config(config);
})();