'use strict';

angular.module('myApp.view3', ['ngRoute','phonecatFilters','phonecatServices','phonecatAnimations']).

    controller('PhoneCatCtrl', function($scope, Phone) {
        $scope.phones = Phone.query();
        $scope.orderProp = 'age';
    }).


    controller('PhoneDetailCtrl', function($scope, $routeParams, Phone) {

        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }
    })
;

