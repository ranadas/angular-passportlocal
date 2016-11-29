'use strict';
var homeController = function HomePageController() {
    console.log('In Home Page Controller');
};

var registerController = function RegisterPageController(contactsService) {
    console.log('In Register Page Controller');
    var self = this;

    self.credentials = {
        name: "",
        email: "",
        password: ""
    };

    self.onSubmit = function () {
        console.log('Registering  with '+JSON.stringify(self.credentials));
        contactsService.register(self.credentials);
    }
};

var profileController = function ProfilePageController() {
    console.log('In Profile Page Controller');
};

var loginController = function LoginPageController(contactsService) {
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