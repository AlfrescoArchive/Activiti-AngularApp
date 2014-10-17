angular.module('activitiApp').factory('ProcessInstancesService', function ($resource) {
    var data = $resource('service/runtime/process-instances/:processInstance', {processInstance: "@processInstance"});
    return data;
});
