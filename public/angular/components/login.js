"use strict";

(function () {
    const name = 'login';

    function Controller($state, AuthService) {
        this.formData = {};
        console.log(AuthService.getApiKey());
        
        this.loginAction = () => {
            let api_key = this.formData.api_key;
            AuthService.setApiKey(api_key);
            this.goToList();
        };
        
        this.goToList = () => {
            $state.transitionTo('repoList');
        };
        
        if(AuthService.getApiKey()){
            console.info('Api Key found');
            this.goToList();
        } else {
            console.info('Api Key not found');
        }
    }

    const componentConfig = {
        templateUrl: `/views/${name}.html`,
        controller: ['$state','AuthService', Controller],
        bindings: {}
    };

    angular
            .module('GApp')
            .component(name, componentConfig);
})();