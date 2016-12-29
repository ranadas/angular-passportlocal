'use strict';
//http://lvasquez.github.io/2015/02/22/AngularJs-ExpressJs-Project/
https://github.com/sirajc/dynamic-menu
var dynamicMenuVariable = angular.module('dynamicMenu', []);


dynamicMenuVariable.factory('dynamicMenuFactory', DynamicMenuFactory);

DynamicMenuFactory.$inject = ['$resource'];

// Function used in service
function DynamicMenuFactory($resource) {
    /* Strictly follow the JSON structure provided in dynamic-menu.json */
    return $resource('dynamic-menu.json', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    });
}


dynamicMenuVariable.controller("DynamicMenuController", ["$scope", '$location',
    function ($scope, $location) {
        $scope.navigationDetail = DynamicMenuFactory.query();
        $scope.$on('$routeChangeSuccess', function() {
            var path = '#app' + $location.path();
            var found = false;
            $scope.navigationDetail.$promise.then(function(result) {
                $scope.navigationDetail = result;
                angular.forEach($scope.navigationDetail.leftMenu, function(menu) {
                    if (path.indexOf(menu.url) == 0) {
                        $scope.navigationDetail.activeMenuId = menu.menuId;
                        found = true;
                    }
                });
                if (!found) {
                    angular.forEach($scope.navigationDetail.rightMenu, function(menu) {
                        if (path.indexOf(menu.url) == 0) {
                            $scope.navigationDetail.activeMenuId = menu.menuId;
                            found = true;
                        }
                    });
                }
            });
        });
    }
]);

dynamicMenuVariable.directive('navigationBar', function () {
    // Runs during compile
    return {
        name: 'navigationBar',
        scope: {
            navigationDetail: '='
        },
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: './partials/dynamic-menu.html',
        replace: true,
    };
});