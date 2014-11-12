'use strict';

angular.module('myApp.view3', ['ngRoute']).


/*
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/view_phone_cat', {templateUrl: 'view_phone_cat/view_phone_cat.html',controller: 'PhoneCatCtrl'}).
            when("/view_phone_cat/:phoneId", {templateUrl: "view_phone_cat/view_phone_cat-detail.html", controller: "PhoneDetailCtrl"})
        ;
    }]).
*/

    controller('PhoneCatCtrl', function($scope, $http) {
        $http.get('phones/phones.json').success(function(data) {
            $scope.phones = data;
        });
        //initialize order by age
        $scope.orderProp = 'age';
    }).


    controller('PhoneDetailCtrl', function($scope, $routeParams, $http) {
        $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
            $scope.phone = data;
        });
    })

;

