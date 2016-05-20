(function() {
    'use strict';

    angular.module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var loginData = null;

        return {
            find: find,
            login: login,
            getLoginData: getLoginData
        };

        function find() {
            return $http({
                url: '/api/users',
                method: 'GET'
            })
            .then(function transformUsers(response) {
                return response.data;
            });
        }

        function login(user) {
            return $http({
                url: '/api/users/login',
                method: 'POST',
                data: user
            })
            .then(function cacheLoginData(response) {
                loginData = response.data;
                return loginData;
            });
        }

        function getLoginData() {
            return loginData;
        }
    }
})();