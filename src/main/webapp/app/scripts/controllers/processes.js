angular.module('activitiApp').controller('ProcessesCtrl', function ($scope, $rootScope, $location, ProcessDefinitionService, ProcessInstanceService, FormDataService, $modal, moment, TasksModalService) {
    if (typeof  $rootScope.loggedin == 'undefined' || $rootScope.loggedin == false) {
        $location.path('/login');
        return;
    }

    $scope.loadDefinitions = function () {
        $scope.processes = ProcessDefinitionService.get({latest: "true"});
    }

    $scope.loadDefinitions();

    $scope.startTheProcess = function (processDefinition) {

        TasksModalService.loadProcessForm(processDefinition);

        var formService = new FormDataService({processDefinitionId: processDefinition.id});
        formService.$startTask(function (data) {
            console.log(data);
        });
    };

    $scope.activateTheProcessDefinition = function (processDefinition) {
        var action = new ProcessDefinitionService();
        action.action = "activate";
        action.includeProcessInstances = "true";
        action.$update({"processDefinitionId": processDefinition.id}, function () {
            $scope.loadDefinitions();
        });
    }

    $scope.query = "";
});
