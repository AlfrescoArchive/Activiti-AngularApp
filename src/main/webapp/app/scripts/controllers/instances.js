angular.module('activitiApp').controller('InstancesCtrl', function ($scope, $rootScope, $location,  $modal, moment,ProcessInstancesService,ProcessInstanceService,ProcessDefinitionService) {
    if (typeof  $rootScope.loggedin == 'undefined' || $rootScope.loggedin == false) {
        $location.path('/login');
        return;
    }

    $scope.loadDefinitions = function () {
        ProcessInstancesService.get({size:1000,latest: "true",sort:"id"},function(instances){
            $scope.instances =instances;
            ProcessDefinitionService.get({latest: "true"},function(data){
                    for(var i=0;i<data.data.length;i++)
                    {
                        var definition = data.data[i];
                     for(var j=0;j<instances.data.length;j++)
                        {
                            if(instances.data[j].processDefinitionId == definition.id)
                            {
                                instances.data[j].name = definition.name;
                            }
                        }
                    }
                });
        });
   }

    $scope.loadDefinitions();



    var InstancesDetailsCtrl = function ($scope, $modalInstance,instance)
    {
        $scope.instance =  instance;
        $scope.ok = function () {
            $modalInstance.close(group);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.delete = function (instance) {


            $modalInstance.dismiss('cancel');
        };

        $scope.diagram = "/service/runtime/process-instances/"+instance.id+"/diagram";



        $scope.instance.details = ProcessInstancesService.get({processInstance:instance.id});
    }

    $scope.showDetails = function (instance) {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/instanceDetails.html',
            controller: InstancesDetailsCtrl,
            resolve: {
                instance: function () {
                    return instance;
                }
            }
        });
        modalInstance.result.then(function (newGroup) {

        }, function () {
        });
    };

    $scope.query = "";
});
