'use strict';
/** 1. Handler for Home page*/
var homeController = function HomePageController($location, contactsService) {
    console.log('In Home Page Controller');
    var self = this;
    if (contactsService.isLoggedIn()) {
        self.userLoggedIn = true;
        self.loggedUserDetails = contactsService.currentUser();
    } else {
        self.userLoggedIn = false;
    }
};
homeController.$inject = ['$location', 'contactsService'];

/** 2. Handler for Register User page followed by module injects*/
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

/** 3. Handler for User profile page*/
var profileController = function ProfilePageController() {
    console.log('In Profile Page Controller');
};

/** 4. Handler for Login page followed by module injects*/
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
                alert(JSON.stringify(err));
            })
            .then(function(){
                //$location.path('profile');
                $location.path('/');
            });
    }
};
loginController.$inject = ['$location', 'contactsService'];

/** 5. Handler for Downloads page*/
var downloadController = function DownloadPageController() {
    console.log('In Downloads Page Controller');
};

/** 4. Handler for Menu Links followed by module injects*/
var menuController = function ($location, contactsService) {
    console.log('In Menu Controller');
    var self = this;
    self.userLoggedIn;

    self.isUserLogged = function(){
        return contactsService.isLoggedIn();
    };

    self.userLoggedIn = contactsService.isLoggedIn();

    self.clickLogout = function() {
        if (self.userLoggedIn) {
            //console.log('tkn is ' + contactsService.getToken());
            console.log('Loggin Out so');
            contactsService.logout();
            $location.path('/');
        }
        else {
            console.log('ALREADY Logged Out ');
        }
    }
};
menuController.$inject = ['$location', 'contactsService'];