var app = angular.module('BMICalculator',[]);
app.controller('BMIController',function($scope) {
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