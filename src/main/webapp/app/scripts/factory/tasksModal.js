angular.module('activitiApp').factory('TasksModalService', function ($modal, FormDataService, TasksService, $rootScope,UserService,ProcessInstanceService,ProcessInstancesService) {

    var ModalInstanceCtrl = function ($scope, $modalInstance, moment, taskDetailed) {
        $scope.taskDetailed = taskDetailed;


        function extractDataFromForm(objectOfReference) {
            var objectToSave = {
                "taskId": objectOfReference.id,
                properties: []
            }
            for (var key in objectOfReference.propertyForSaving) {
                var forObject = objectOfReference.propertyForSaving[key];

                if (!forObject.writable) {//if this is not writeable property do not use it
                    continue;
                }

                if (forObject.value != null) {
                    var elem = {
                        "id": forObject.id,
                        "value": forObject.value
                    };
                    if (typeof forObject.datePattern != 'undefined') {//format
                        var date = new Date(forObject.value);
                        elem.value = moment(date).format(forObject.datePattern.toUpperCase());
                    }
                    objectToSave.properties.push(elem);
                }
            }

            return objectToSave;
        }


        function extractDataFromFormForProcess(objectOfReference) {
            var objectToSave = {
                "processDefinitionId": objectOfReference.id,
                variables: []
            }
            for (var key in objectOfReference.propertyForSaving) {
                var forObject = objectOfReference.propertyForSaving[key];

                if (!forObject.writable) {//if this is not writeable property do not use it
                    continue;
                }

                if (forObject.value != null) {

                    console.log(forObject);
                    var elem = {
                        "name": forObject.id,
                        "value": forObject.value
                    };
                    if (typeof forObject.datePattern != 'undefined' && forObject.datePattern!=null) {//format
                        var date = new Date(forObject.value);

                        elem.value = moment(date).utc();
                    }
                    objectToSave.variables.push(elem);
                }
            }

            return objectToSave;
        }

        $scope.finish = function (detailedTask) {

            if (typeof detailedTask.propertyForSaving != "undefined") {
                var objectToSave = extractDataFromForm(detailedTask);

                var saveForm = new FormDataService(objectToSave);
                saveForm.$save(function () {
                    emitRefresh();
                    $modalInstance.dismiss('cancel');
                });
            } else {
                var action = new TasksService();
                action.action = "complete";
                action.$save({"taskId": detailedTask.id}, function () {
                    emitRefresh();
                    $modalInstance.dismiss('cancel');
                });
            }

        };

        $scope.startProcess = function (detailedTask) {

            if (typeof detailedTask.propertyForSaving != "undefined") {
                var objectToSave = extractDataFromFormForProcess(detailedTask);

                var saveForm = new ProcessInstancesService(objectToSave);
                saveForm.$save(function () {
                    emitRefresh();
                    $modalInstance.dismiss('cancel');
                });
            } else {
                var action = new TasksService();
                action.action = "complete";
                action.$save({"taskId": detailedTask.id}, function () {
                    emitRefresh();
                    $modalInstance.dismiss('cancel');
                });
            }

        };


        $scope.assignMe = function (detailedTask) {
            var taskToEdit = new TasksService({"assignee": $rootScope.username});
            taskToEdit.$update({"taskId": detailedTask.id}, function () {
                emitRefresh();
            });

        };

        $scope.takeOwnerShip = function (detailedTask) {
            var taskToEdit = new TasksService({"owner": $rootScope.username});
            taskToEdit.$update({"taskId": detailedTask.id}, function () {
                emitRefresh();
            });
        };

        $scope.openDatePicker = function (obj, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            obj.opened = true;
        };

        $scope.setFormEnum = function (enumm, item,showText ) {
            item.value = enumm.id;
            if(typeof showText== 'undefined') {
                item.name = enumm.name;
            }else{
                item.name = showText;
            }
        };

        var emitRefresh = function () {
            $rootScope.$emit("refreshData", {});
        }

        $scope.cancel = function (taskDetailed) {
            $modalInstance.dismiss('cancel');
        };

    };


    function extractForm(task, data) {
        var propertyForSaving = {};

        for (var i = 0; i < data.formProperties.length; i++) {
            var elem = data.formProperties[i];
            propertyForSaving[elem.id] = {
                "value": elem.value,
                "id": elem.id,
                "writable": elem.writable
            };

            if (elem.datePattern != null) {//if date
                propertyForSaving[elem.id].opened = false; //for date picker
                propertyForSaving[elem.id].datePattern = elem.datePattern;
            }

            if (elem.required == true && elem.type == "boolean") {
                if (elem.value == null) {
                    propertyForSaving[elem.id].value = false;
                }
            }

            if(elem.type=="user")
            {
                elem.enumValues  =  UserService.get();
            }
        }

        task.form = data;
        task.propertyForSaving = propertyForSaving;

    }

    var loadTaskForm = function (task) {
        console.log(task);
        FormDataService.get({"taskId": task.id}, function (data) {
            extractForm(task, data);
        }, function (data) {

            if (data.data.statusCode == 404) {
                alert("there was an error");
            }

        });
    };

    var loadProcessForm = function (processDefinition) {
        FormDataService.get({"processDefinitionId": processDefinition.id}, function (data) {
            extractForm(processDefinition, data)
        }, function (data) {

            if (data.data.statusCode == 404) {
                alert("there was an error");
            }

        });
    };


    var factory = {
        loadTaskForm: function (task) {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/taskForm.html',
                controller: ModalInstanceCtrl,

                resolve: {
                    taskDetailed: function () {
                        return task;
                    }
                }
            });

            modalInstance.result.then(function (taskDetailed) {

            }, function () {

            });
            loadTaskForm(task);
        },
        loadProcessForm: function (processDefinition) {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/processDefinitionForm.html',
                controller: ModalInstanceCtrl,

                resolve: {
                    taskDetailed: function () {
                        return processDefinition;
                    }
                }
            });

            modalInstance.result.then(function (taskDetailed) {

            }, function () {

            });
            loadProcessForm(processDefinition);
        }
    };
    return factory;
});