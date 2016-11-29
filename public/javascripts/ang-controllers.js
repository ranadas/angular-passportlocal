'use strict';
var homeController = function HomePageController() {
    console.log('In Home Page Controller');
};

var registerController = function RegisterPageController($location, contactsService) {
    console.log('In Register Page Controller');
    var self = this;

    self.credentials = {
        name: "",
        email: "",
        password: ""
    };

    self.onSubmit = function () {
        console.log('Registering  with ' + JSON.stringify(self.credentials));
        contactsService.register(self.credentials)
            .error(function (err) {
                alert(err);
            })
            .then(function () {
                $location.path('profile');
            });
    }
};
registerController.$inject = ['$location', 'contactsService'];

var profileController = function ProfilePageController() {
    console.log('In Profile Page Controller');
};

var loginController = function LoginPageController($location, contactsService) {
    console.log('In Login Page Controller');
    var self = this;

    self.credentials = {
        email: "",
        password: ""
    };

    self.onSubmit = function () {
        console.log('In Login Page, submit..');
        contactsService.login(self.credentials)
            .error(function(err){
                alert(err);
            })
            .then(function(){
                $location.path('profile');
            });
    }
};
loginController.$inject = ['$location', 'contactsService'];