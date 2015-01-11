'use strict';

var jobHuntApp = angular.module('myApp.membership', ['ngRoute','membershipServices'])

.controller('MembershipCtrl', function($scope,$modal,sharedServices) {
    $scope.memberships = sharedServices.getMemberships();

    $scope.getClubNameByID = function (_index) {
        return sharedServices.getCurrentClubByID(_index);
    };

    $scope.openDeleteConfirm = function (size,_index) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalDeleteCtrl',
            size: size,
            resolve: {
                _index: function () {
                    return _index;
                }
            }
        });

        modalInstance.result.then(function (retVal) {
            $scope.membership = retVal;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

})

.controller('ModalDeleteCtrl', function ($scope, $http, $modalInstance, _index, sharedServices) {
    $scope.ok = function () {
        sharedServices.deleteCurrentRecord(_index);
        $modalInstance.close(sharedServices.getMemberships());
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

})

;