

(function() {
    'use strict';

    var assert = chai.assert;

    suite('user service', function() {
        var UserService, $httpBackend;

        setup(module('app'));

        setup(inject(function(_UserService_, _$httpBackend_) {
            UserService = _UserService_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenPOST('/api/users/login')
                .respond({
                    token: 123456,
                    user: { id: 13, name: 'Jordan' }
                });
            $httpBackend
                .whenGET('/api/users')
                .respond([
                    { id: 13, name: 'Jordan' },
                    { id: 29, name: 'Russell' },
                    { id: 31, name: 'James' }
                ]);
        }));

        test('login data empty on load', function() {
            assert.strictEqual(UserService.getLoginData(), null, 'login data is null to start');
        });

        test('logging in', function(done) {
            UserService.login({})
                .then(function(data) {
                    assert.strictEqual(data.token, 123456, 'token is correct in return data');
                    assert.ok(data.user, 'return data has a user object');

                    var loginData = UserService.getLoginData();
                    assert.strictEqual(loginData.token, 123456, 'login data getter works after login (token)');
                    assert.ok(loginData.user, 'login data getter works after login (user)');

                    done();
                })
                .catch(function() {
                    assert.ok(false, 'should not fail promise');
                    done();
                });
            $httpBackend.flush();  //us telling the mock backend to complete all held(intercepted) ajax request
        });

        test('find users', function(done) {
            UserService.find()
                .then(function(data) {
                    assert.ok(data, 'we have user data');
                    assert.strictEqual(data.length, 3, 'correct number of results');
                    assert.ok(data[0].name, 'Jordan', 'name is correct in record 1');

                    done();
                })
                .catch(function() {
                    assert.ok(false, 'should not fail promise');
                    done();
                });
            $httpBackend.flush();
        });

    });

})();