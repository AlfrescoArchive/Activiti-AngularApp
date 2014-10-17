angular.module('activitiApp').factory('FormDataService', function ($resource) {
    var data = $resource('service/form/form-data', {}, {
        startTask: {method:'GET',  params: {processDefinitionId: "@processDefinitionId"}}
    });
    return data;
});