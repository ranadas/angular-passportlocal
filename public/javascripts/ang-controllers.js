'use strict';
/** 1. Handler for Home page*/
var homeController = function HomePageController($location, contactsService, $rootScope) {
    console.log('In Home Page Controller');
    var self = this;
    self.userLoggedIn = contactsService.isLoggedIn();
    $rootScope.menu_list = contactsService.menuList(self.userLoggedIn);

    if (contactsService.isLoggedIn()) {
        self.userLoggedIn = true;
        self.loggedUserDetails = contactsService.currentUser();
    } else {
        self.userLoggedIn = false;
    }
};
homeController.$inject = ['$location', 'contactsService', '$rootScope'];

/** 2. Handler for Register User page followed by module injects*/
var registerController = function RegisterPageController($location, contactsService, $rootScope) {
    console.log('In Register Page Controller');
    var self = this;

    self.credentials = {
        name: "",
        email: "",
        password: ""
    };

    self.userLoggedIn = contactsService.isLoggedIn();
    $rootScope.menu_list = contactsService.menuList(self.userLoggedIn);

    self.onSubmit = function () {
        console.log('Registering  with ' + JSON.stringify(self.credentials));
        contactsService.register(self.credentials)
            .then(function () {
                $location.path('profile');
            });
    }
};
registerController.$inject = ['$location', 'contactsService', '$rootScope'];

/** 3. Handler for User profile page*/
var profileController = function ProfilePageController(contactsService) {
    console.log('In Profile Page Controller');
    var self = this;
    self.user = {
        email: ""
    };
    var cUser = contactsService.currentUser();
    self.user.email = cUser.email;
    contactsService.profile(cUser.email)
        .success(function (data, status, headers, config) {
            console.log(data.data);
            self.user.name = data[0].name;
        })
        .error(function (data, status, header, config) {
            console.log(data.data);
        });

};
profileController.$inject = ['contactsService'];

/** 4. Handler for Login page followed by module injects*/
var loginController = function LoginPageController($location, contactsService, $rootScope) {
    console.log('In Login Page Controller');
    var self = this;

    self.credentials = {
        email: "",
        password: ""
    };

    self.userLoggedIn = contactsService.isLoggedIn();
    $rootScope.menu_list = contactsService.menuList(self.userLoggedIn);

    self.onSubmit = function () {
        console.log('In Login Page, submit..');
        contactsService.login(self.credentials)
            .then(function(){
                //$location.path('profile');
                //$rootScope.menu_list = ['home', 'logout', 'download', 'profile'];
                $rootScope.menu_list = contactsService.menuList(true);
                $location.path('profile');
            });
    }
};
loginController.$inject = ['$location', 'contactsService', '$rootScope'];

/** 5. Handler for Downloads page*/
var downloadController = function DownloadPageController() {
    console.log('In Downloads Page Controller');
};

/** 4. Handler for Menu Links followed by module injects*/
var menuController = function ($location, contactsService, $rootScope) {
    console.log('In Menu Controller');
    var self = this;
    console.log($rootScope.menu_list);
    //self.menu_list = $rootScope.test;
    self.userLoggedIn;

    self.isUserLogged = function(){
        return contactsService.isLoggedIn();
    };

    self.userLoggedIn = contactsService.isLoggedIn();
    $rootScope.menu_list = contactsService.menuList(self.userLoggedIn);

    self.clickLogout = function() {
        if (self.userLoggedIn) {
            //console.log('tkn is ' + contactsService.getToken());
            console.log('Loggin Out so');
            contactsService.logout();
            //$rootScope.menu_list = ['home', 'login', 'logout', 'register'];
            $rootScope.menu_list = contactsService.menuList(false);
            $location.path('/');
        }
        else {
            console.log('ALREADY Logged Out ');
            $rootScope.menu_list = contactsService.menuList(false);
            $location.path('/');
        }
    }
};
menuController.$inject = ['$location', 'contactsService', '$rootScope'];