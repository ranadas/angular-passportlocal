'use strict';


var contactsModuleVariable = angular.module('contactsModule', []);

contactsModuleVariable.factory('contactsService', ContactService);

// Function used in service
function ContactService($http, $q) {
    var service = {};
}