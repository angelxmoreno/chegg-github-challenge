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
            url: '/repos-list',
            parent: 'authView',
            component: 'repoList',
        },
        {
            name: 'repos',
            url: '/repos/:org/:repo',
            parent: 'authView',
            component: 'repos',
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