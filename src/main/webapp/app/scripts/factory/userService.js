angular.module('activitiApp').factory('UserService', function ($resource) {
    var data = $resource('/service/identity/users/:user', {user: "@user"});
    return data;
});
