'use strict';

var jobHuntApp = angular.module('myApp.membership', ['ngRoute','membershipServices'])

.controller('MembershipCtrl', function($scope,$modal,sharedServices) {
    $scope.memberships = sharedServices.getMemberships();

    $scope.getClubNameByID = function (_index) {
        return sharedServices.getCurrentClubByID(_index);
    };

    $scope.openDeleteMemberConfirm = function (size,_index) {
        var modalInstance = $modal.open({
            templateUrl: 'myMemberModalContent.html',
            controller: 'ModalDeleteMemberCtrl',
            size: size,
            resolve: {
                _index: function () {
                    return _index;
                }
            }
        });

        modalInstance.result.then(function (retVal) {
            $scope.memberships = retVal;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

})

.controller('ModalDeleteMemberCtrl', function ($scope, $http, $modalInstance, _index, sharedServices) {
    $scope.ok = function () {
        sharedServices.deleteCurrentRecord(_index);
        $modalInstance.close(sharedServices.getMemberships());
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

})

;