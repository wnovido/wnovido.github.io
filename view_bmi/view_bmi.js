'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view_bmi', {
      templateUrl: 'view_bmi/view_bmi.html',
      controller: 'BMICtrl'
  });
}])

.controller('BMICtrl', function($scope) {
      $scope.bmi = 0;
      $scope.heightFt = 0;
      $scope.heightInch = 0;
      $scope.weightLb = 0;

      $scope.calcBMI = function() {
        if ($scope.heightFt === null || $scope.heightInch === null || $scope.weightLb === null)
          $scope.bmi = 0;
        else
          $scope.bmi = $scope.weightLb/Math.pow($scope.heightFt * 12 + $scope.heightInch,2)*703;
      };
});


