'use strict';

var contactsModuleVariable = angular.module('contactsModule', []);

contactsModuleVariable.factory('contactsService', ContactService);

ContactService.$inject = ['$http', '$window'];
// Function used in service
function ContactService($http, $window) {
    var service = {};

    service.saveToken = saveToken;
    service.getToken = getToken;
    service.isLoggedIn = isLoggedIn;
    service.currentUser = currentUser;
    service.register = register;
    service.login = login;
    service.logout = logout;

    function saveToken(token) {
        $window.localStorage['mean-token'] = token;
    };

    function getToken() {
        return $window.localStorage['mean-token'];
    };

    function isLoggedIn() {
        var token = getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    function currentUser() {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email: payload.email,
                name: payload.name
            };
        }
    };

    function register(user) {
        return $http.post('/api/register', user).success(function (data) {
            saveToken(data.token);
        });
    };

    function login(user) {
        return $http.post('/api/login', user).success(function (data) {
            saveToken(data.token);
        });
    };

    function logout() {
        $window.localStorage.removeItem('mean-token');
    };

    //function regist(user) {
    //    console.log('Registering a user !');
    //    return $http.post('/api/register', user)
    //        .success(function (data, status, headers, config) {
    //            console.log(data.data);
    //        })
    //        .error(function (data, status, header, config) {
    //            console.log(data.data);
    //        });
    //
    //}

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

    // important returned object.
    return service;
}