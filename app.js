'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when("/view1", {templateUrl: "view1/view1.html", controller: "driversController"}).
      when("/view1/:id", {templateUrl: "view1/driver.html", controller: "driverController"}).
      otherwise({redirectTo: '/view1'});
}]);

