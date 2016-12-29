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
    service.menuList = MenuList;
    service.profile = profile;

    function saveToken(token) {
        $window.localStorage['mean-token'] = token;
    };

    function getToken() {
        return $window.localStorage['mean-token'];
    };

    function isLoggedIn() {
        var token = getToken();
        var payload;

        if ((typeof token === 'undefined') ||
            token === 'undefined') {
            return false;
        }
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
        return $http.post('/api/register', user).then(function (data) {
            saveToken(data.data.token);
        });
    };

    function login(user) {
        return $http.post('/api/login', user).then(function (data) {
            saveToken(data.data.token);
        });
    };

    function logout() {
        $window.localStorage.removeItem('mean-token');
    };

    function profile(userEmail) {
        return $http.get('/api/profile/'+ userEmail);
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

    /*
     [
     {
     "id":"0",
     "href":"/",
     "display":"Home"
     },
     {
     "id":"1",
     "href":"login",
     "display":"Login"
     },
     {
     "id":"2",
     "href":"register",
     "display":"register"
     },
     {
     "id":"3",
     "href":"download",
     "display":"Download"
     },
     {
     "id":"4",
     "href":"download",
     "display":"Download"
     },
     {
     "id":"5",
     "href":"profile",
     "display":"Profile"
     },
     {
     "id":"6",
     "href":"#",
     "display":"Logout"
     }
     ]
     */
    function MenuList(authenticated) {
        if (authenticated) {
            var menu_list = [
                {
                    "id": "0",
                    "href": "/",
                    "display": "Home"
                },
                {
                    "id": "1",
                    "href": "download",
                    "display": "Download"
                },
                {
                    "id": "2",
                    "href": "profile",
                    "display": "Profile"
                },
                {
                    "id": "3",
                    "href": "#",
                    "display": "Logout"
                }
            ];
            return menu_list;
        } else {
            var menu_list = [
                {
                    "id": "0",
                    "href": "/",
                    "display": "Home"
                },
                {
                    "id": "1",
                    "href": "login",
                    "display": "Login"
                },
                {
                    "id": "2",
                    "href": "register",
                    "display": "Register"
                }
            ];
            return menu_list;
        }
    }

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