'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view_phone_cat', {
            templateUrl: 'view_phone_cat/view_phone_cat.html',
            controller: 'PhoneCatCtrl'
        });
    }])

    .controller('PhoneCatCtrl', function($scope) {
        $scope.phones = [
            {'name': 'Nexus S',
                'snippet': 'Fast just got faster with Nexus S.'},
            {'name': 'Motorola XOOM™ with Wi-Fi',
                'snippet': 'The Next, Next Generation tablet.'},
            {'name': 'MOTOROLA XOOM™',
                'snippet': 'The Next, Next Generation tablet.'},
            {'name': 'SAMSUNG',
                'snippet': 'Blah Blah Blah 1.'},
            {'name': 'iPhone 10s PLUS',
                'snippet': 'BlahSSSSS Blah Blah 1.'},
            {'name': 'iPhone 6',
                'snippet': 'BG Phone.'}
        ];
    });

