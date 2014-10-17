angular.module('activitiApp').controller('GroupsCtrl', function ($scope, $rootScope, $location, GroupService, $modal) {
    if (typeof  $rootScope.loggedin == 'undefined' || $rootScope.loggedin == false) {
        $location.path('/login');
        return;
    }
    $scope.groups = GroupService.get();

    /**
     * Initial data of new group
     * @type {{id: string, name: string, type: string}}
     */
    $scope.newGroup = {"id": "", "name": "", "type": "security-role"};

    /**
     * Create group function
     * @param newGroup
     */
    $scope.newGroupSubmited = false;
    $scope.createGroup = function (newGroup) {
        var group = new GroupService(newGroup);
        group.name = newGroup.name;
        group.id = newGroup.id;
        group.$save(function (u, putResponseHeaders) {
            $scope.groups.data.push(u);
            $scope.isCollapsed = true;
            $scope.newGroup.id = "";
            $scope.newGroup.name = "";
        });
    };

    /**
     * Controler for handling modal actions
     * @param $scope
     * @param $modalInstance
     * @param newGroup
     * @constructor
     */
    var ModalInstanceCtrl = function ($scope, $modalInstance, newGroup) {
        $scope.newGroup = newGroup;
        $scope.ok = function () {
            $modalInstance.close($scope.newGroup);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    /**
     * Open Modal
     */
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/createGroup.html',
            controller: ModalInstanceCtrl,
            resolve: {
                newGroup: function () {
                    return $scope.newGroup;
                }
            }
        });
        modalInstance.result.then(function (newGroup) {
            $scope.createGroup(newGroup);
        }, function () {
        });
    };

    /**
     * Cancel dialog
     */
    $scope.cancel = function () {
        $scope.newGroup.id = "";
        $scope.newGroup.name = "";
    };

    /**
     * Remove Group
     * @param group
     */
    $scope.removeGroup = function (group) {
        GroupService.delete({"group": group.id}, function (data) {
            $scope.groups = GroupService.get();
        });
    };

    $scope.query = "";

    /**
     * Groups edit dialog
     */
    var ModalGroupUsersInstanceCtrl = function ($scope, $modalInstance, group, UserService, GroupUserService) {
        $scope.group = group;
        $scope.ok = function () {
            $modalInstance.close(group);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function reloadUsers() {
            $scope.groupUsers = UserService.get({"memberOfGroup": group.id});
        }

        $scope.removeUser = function (user) {
            var groupUserService = new GroupUserService();
            groupUserService.$delete({"group": group.id, "userId": user.id}, function () {
                reloadUsers();
            });
        }

        reloadUsers();

        $scope.users = UserService.get();

        function clearSelection() {
            $scope.selected = undefined;
        }

        $scope.onSelect = function ($item, $model, $label) {
            $scope.addUserError = false;
            var groupUserService = new GroupUserService();
            groupUserService.userId = $item.id;
            groupUserService.$save({"group": group.id}, function () {
                clearSelection();
                reloadUsers();
            }, function () {
                $scope.addUserError = true;
            });
        };

        clearSelection();

    }

    $scope.showGroupUsers = function (group) {
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/groupUsers.html',
            controller: ModalGroupUsersInstanceCtrl,
            resolve: {
                group: function () {
                    return group;
                }
            }
        });
        modalInstance.result.then(function (newGroup) {

        }, function () {
        });
    };

});
