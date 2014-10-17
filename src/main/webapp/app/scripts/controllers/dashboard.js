angular.module('activitiApp').controller('DashboardCtrl', function ($scope, $rootScope, $location,TasksService) {
    if (typeof  $rootScope.loggedin == 'undefined' || $rootScope.loggedin == false) {
        $location.path('/login');
        return;
    }



    $scope.tasks = TasksService.get({"size": 1000, "assignee": $rootScope.username});

});