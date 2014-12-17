'use strict';

angular.module('myApp.photography', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/photography', {templateUrl: 'photography/photography.html',controller: 'PhotographyCtrl'});
}])

    .controller('PhotographyCtrl', function ($scope) {
      $scope.myInterval = 500;
      var slides = $scope.slides = [];

      $scope.addSlide = function() {
        var newWidth = slides.length + 1;

        slides.push({
          image: 'img/slides/' + newWidth + '.jpg',
          text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Gorgeous', 'Cutify', 'Felines', 'Cutes'][slides.length % 4]
        });
      };
      for (var i=0; i<11; i++) {
        $scope.addSlide();
      }
    });