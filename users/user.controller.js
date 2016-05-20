(function() {
    'use strict';

    angular.module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService'];

    function UserController(UserService) {
        var that = this;
        this.message = null;
        this.loginData = {};
        this.currentUser = null;

        this.login = function login() {
            if (!this.loginData.email || !this.loginData.password) {
                this.message = 'Please enter a valid email and password';
            } else {
                return UserService.login(this.loginData)
                    .then(function handleUserData(data) {
                        that.currentUser = data;
                    });
            }
        };
    }
})();