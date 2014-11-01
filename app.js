var app = angular.module('BMICalculator',[]);
app.controller('BMIController',function($scope) {
        $scope.bmi = 0;
        $scope.heightFt = 0;
        $scope.heightInch = 0;
        $scope.weightLb = 0;

        $scope.calcBMI = function() {
            $scope.bmi = $scope.weightLb/Math.pow($scope.heightFt * 12 + $scope.heightInch,2)*703;
        };
});