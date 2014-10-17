angular.module('activitiApp').factory('GroupUserService', function ($resource) {
    var data = $resource('service/identity/groups/:group/members/:userId', {group: "@group",userId:"@userUrlId"});
    return data;
});
