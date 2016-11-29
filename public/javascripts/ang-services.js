'use strict';


var contactsModuleVariable = angular.module('contactsModule', []);

contactsModuleVariable.factory('contactsService', ContactService);

// Function used in service
function ContactService($http, $q) {
    var service = {};

    service.register = regist;

    // important returned object.
    return service;
    function regist(user) {
        console.log('Registering a user !');
        return $http.post('/api/register', user)
            .success(function (data, status, headers, config) {
                console.log(data.data);
            })
            .error(function (data, status, header, config) {
                console.log(data.data);
            });

    }

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }
}