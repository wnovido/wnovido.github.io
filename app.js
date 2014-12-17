'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.version',
  'myApp.services',
  'myApp.photography',
  'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when("/view1", {templateUrl: "view1/view1.html", controller: "driversController"}).
    when("/view1/:id", {templateUrl: "view1/driver.html", controller: "driverController"}).
    when("/view_bmi", {templateUrl: "view_bmi/view_bmi.html", controller: "BMICtrl"}).
    when("/view_bmi2", {templateUrl: "view_bmi/view_bmi2.html", controller: "BMICtrl"}).
    when("/view_phone_cat", {templateUrl: "view_phone_cat/view_phone_cat.html", controller: "PhoneCatCtrl"}).
    when("/phones/:phoneId", {templateUrl: "view_phone_cat/view_phone_cat-detail.html", controller: "PhoneDetailCtrl"}).
    when("/movie_stub", {templateUrl: "movie_stub/movie_stub_home.html", controller: "MovieStubCtrl"}).
    when("/movie_stub/:id", {templateUrl: "movie_stub/movie.html", controller: "movieDetailsController"}).
    when("/bookTickets/:id", {templateUrl: "movie_stub/bookTickets.html", controller: "bookTicketsController"}).
    when('/bookings',{templateUrl: 'movie_stub/bookings.html',controller: 'bookingDetailsController'}).
    when("/addMovie",{templateUrl: "movie_stub/addMovie.html", controller: "addMovieController"}).
    otherwise({redirectTo: "/photography"});

}])

.controller('myAppCtrl', function($scope) {

    $scope.photography = "active";
    $scope.myFunction= function(path) {
        $scope.photography = (path === "#/photography" ? "active" : "");
        $scope.act1 = (path === "#/view1" ? "active" : "");
        $scope.act2 = (path === "#/view_bmi" ? "active" : "");
        $scope.act3 = (path === "#/view_phone_cat" ? "active" : "");
        $scope.act4 = (path === "#/movie_stub" ? "active" : "");
    };
});
