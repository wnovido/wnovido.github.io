'use strict';

var jobHuntApp = angular.module('myApp.jobhunt', ['ngRoute','jobHuntServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/jobhunt', {templateUrl: 'jobhunt/jobhunt.html',controller: 'JobHuntCtrl'}).
      when('/manageJob/:_jobID', {templateUrl: 'jobhunt/manageJob.html', controller: 'manageJobHuntCtrl'});
}])

.controller('JobHuntCtrl', function($scope,$modal,sharedServices) {
    $scope.jobhunts = sharedServices.getJobHunts();

    $scope.openDeleteConfirm = function (size,_index) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalJobHuntCtrl',
            size: size,
            resolve: {
                _index: function () {
                    return _index;
                }
            }
        });

        modalInstance.result.then(function (jobHunts) {
            $scope.jobhunts = jobHunts;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

})

.controller('ModalJobHuntCtrl', function ($scope, $http, $modalInstance, _index, sharedServices) {
    $scope.ok = function () {
        sharedServices.deleteCurrentJob(_index);
        $modalInstance.close(sharedServices.getJobHunts());
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

})

;