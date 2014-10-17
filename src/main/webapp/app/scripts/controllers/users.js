angular.module('activitiApp').
    controller('UsersCtrl', function ($scope, $http, UserService, $rootScope, $location, $modal) {
        if (typeof  $rootScope.loggedin == 'undefined' || $rootScope.loggedin == false) {
            $location.path('/login');
            return;
        }
        $scope.users = UserService.get();


        /**
         * New user Initial data
         */
        $scope.newUser = {
            "id": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": ""
        }

        /**
         * Create user function
         * @param newUser
         */
        $scope.createUser = function (newUser) {
            var user = new UserService(newUser);
            user.id = newUser.id;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.email = newUser.email;
            user.password = newUser.password;

            user.$save(function (u, putResponseHeaders) {
                $scope.users.data.push(u);
            });
        };

        /**
         * Controler for handling modal
         * @param $scope
         * @param $modalInstance
         * @param newUser
         * @constructor
         */
        var ModalInstanceCtrl = function ($scope, $modalInstance, newUser) {
            $scope.newUser = newUser;
            $scope.ok = function () {
                $modalInstance.close(newUser);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        /**
         * Show modal dialog
         */
        $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/createUser.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    newUser: function () {
                        return $scope.newUser;
                    }
                }
            });
            modalInstance.result.then(function (newUser) {
                $scope.createUser(newUser);
            }, function () {
            });
        };


        $scope.removeUser = function (user) {
            UserService.delete({"user": user.id}, function (data) {
                $scope.users = UserService.get();
            });
        }

        $scope.query = "";


        /**
         * Managing users groups
         */

        var ModalGroupUsersInstanceCtrl = function ($scope, $modalInstance, user, UserService, GroupUserService, GroupService) {

            $scope.user = user;

            $scope.ok = function () {
                $modalInstance.close(group);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            function reloadGroups() {
                $scope.userGroups = GroupService.get({"member": user.id});
            }


            $scope.removeGroup = function (group) {
                var groupUserService = new GroupUserService();
                groupUserService.$delete({"group": group.id, "userId": user.id}, function () {
                    reloadGroups();
                });
            }


            $scope.groups = GroupService.get();
            $scope.onSelect = function ($item, $model, $label) {
                $scope.addUserError = false;
                var groupUserService = new GroupUserService();
                groupUserService.userId = user.id;
                groupUserService.$save({"group": $item.id}, function () {
                    reloadGroups();
                }, function () {
                    $scope.addUserError = true;
                });
            };

            reloadGroups();
        }

        $scope.showUserGroups = function (user) {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/userGroups.html',
                controller: ModalGroupUsersInstanceCtrl,
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
            modalInstance.result.then(function (user) {

            }, function () {
            });
        };
    });