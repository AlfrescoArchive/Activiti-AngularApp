'use strict';
angular.module('activitiApp').controller('RootCtrl', function ($scope, $http, UserService, Base64, $rootScope, $location) {
    $scope.logout = function () {
        Session.clear();
        $location.path('/login');
    }
    $scope.changeView = function (view) {
        $location.path(view);
    };

});