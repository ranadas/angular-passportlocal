'use strict';
//var angularApp = angular.module('angularApp', ['ui.router']);
var angularApp = angular.module('angularApp', ['ngRoute']);


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
        .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}

angularApp.config(['$routeProvider', '$locationProvider', config]);

var homeController = function HomePageController() {
    console.log('In Home Page Controller');
};

var registerController = function RegisterPageController() {
    console.log('In Register Page Controller');
    var self = this;

    self.credentials = {
        name: "",
        email: "",
        password: ""
    };

    self.onSubmit = function () {
        console.log('Submitting registration');
    }
};

var profileController = function ProfilePageController() {
    console.log('In Profile Page Controller');
};

var loginController = function LoginPageController() {
    console.log('In Login Page Controller');
    var self = this;

    self.credentials = {
        email: "",
        password: ""
    };

    self.onSubmit = function () {
        console.log('In Login Page, submit..');
    }
};