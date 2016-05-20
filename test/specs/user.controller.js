(function() {
    'use strict';

    var assert = chai.assert;

    suite('user controller', function() {      //everything the test is going to do
        var userCtrl, $rootScope;     //need to redefining rootScope and need a usercontroller because that's what we are doing
        var loginCalls = 0;
        var mockUserService = {};     //need a mock for everything you inject. In this case, it is MockUserService

        setup(module('app'));   //set this up, it comes from angular mocks

        setup(module(function($provide) {        //create a $provide for everything that is $injected  so use a module
            $provide.value('UserService', mockUserService);   //what should the value for userService be
        }));

        setup(inject(function(_$rootScope_, $controller, $q){   //resolution or rejection in a promise "$q is a fake promise and _rootscope_ is needed"
            $rootScope = _$rootScope_;   //redefine rootscope

            userCtrl = $controller('UserController');   //execute user controller makes a new controller for each test

            mockUserService.login = function() {   //mock out this service...but how
                var def = $q.defer();         //we want to do some stuff and pretend to return a promise (put in the arguments what it asks for in the app)
                def.resolve({ token: 123456, user: { id: 13, name: 'Jordan' } });   //data to resolve with
                loginCalls++;
                return def.promise;    //now you can call a .then on it
            };
            loginCalls = 0;
        }));

        test('login fails with no email', function() {
            assert.strictEqual(userCtrl.message, null, 'message starts as null');
            assert.strictEqual(userCtrl.login(), undefined, 'login returns undefined with no login data');
            assert.strictEqual(loginCalls, 0, 'service login method was NOT called');
            assert.ok(userCtrl.message.length > 0, 'message is set after login fail');
        });

        test('login works', function(done) {
            assert.strictEqual(userCtrl.message, null, 'message starts as null');
            assert.strictEqual(userCtrl.currentUser, null, 'currentUser starts as null');
            userCtrl.loginData = { email: 'foo', password: 'bar' };
            userCtrl.login()
                .then(function() {
                    assert.strictEqual(userCtrl.message, null, 'message is still null');
                    assert.strictEqual(loginCalls, 1, 'service login method was called');
                    assert.strictEqual(userCtrl.currentUser.token, 123456, 'currentUser token is correct');
                    assert.ok(userCtrl.currentUser.user, 'there is a user object');
                    done();
                })
                .catch(function() {
                    assert.ok(false, 'should not reject promise');
                    done();
                });
            $rootScope.$digest();
        });

    });

})();