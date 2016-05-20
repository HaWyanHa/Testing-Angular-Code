(function() {
    'use strict';

    angular.module('app', ['ui.router'])
        .config(appConfig);

    appConfig.$inject = ['$stateProvider'];
    function appConfig($stateProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                template: '<h2>List of Users...</h2>'
            });
    }
})();