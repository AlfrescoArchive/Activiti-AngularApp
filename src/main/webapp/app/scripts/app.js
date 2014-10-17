'use strict';

angular.module('activitiApp', [ 'ngResource', 'ui.bootstrap', "ngRoute",'angularMoment'])

    // Temporary until we have a login page: always log in with kermit:kermit
//    .config(['$httpProvider', function ($httpProvider) {
//        $httpProvider.defaults.headers.common['Authorization'] = 'Basic a2VybWl0Omtlcm1pdA==';
//    }])



    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }) .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            }).when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UsersCtrl'
            }).when('/groups', {
                templateUrl: 'views/groups.html',
                controller: 'GroupsCtrl'
            }).when('/tasks', {
                templateUrl: 'views/tasks.html',
                controller: 'TasksCtrl'
            }).when('/processes', {
                templateUrl: 'views/processes.html',
                controller: 'ProcessesCtrl'
            }).when('/instances', {
                templateUrl: 'views/instances.html',
                controller: 'InstancesCtrl'
            })

//            .when('/tasks', {
//                templateUrl: 'views/tasks.html',
//                controller: 'TaskCtrl'
//            })
            .otherwise({
                redirectTo: '/'
            });
    }]);



