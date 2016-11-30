(function () {
    'use strict';
//var angularApp = angular.module('angularApp', ['ui.router']);
    var angularApp = angular.module('angularApp', ['ngRoute', 'contactsModule']);


    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './partials/home.html',
                controller: homeController,
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: './partials/register.html',
                controller: registerController,
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: './partials/login.html',
                controller: loginController,
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: profileController,
                controllerAs: 'vm'
            })
            .when('/download', {
                templateUrl: 'partials/downloads.html',
                controller: downloadController,
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    angularApp.config(['$routeProvider', '$locationProvider', config]);

    angularApp.controller('menuController', menuController);

})();