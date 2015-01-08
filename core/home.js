'use strict';

angular.module('core',[]).

	controller('HomeController',
	function($scope, $animate) {
		$animate.enabled(false);

		$scope.myInterval = 5000;
		var slides = $scope.slides = [];
		$scope.addSlide = function() {
			var newWidth = slides.length + 1;
			slides.push({
				image: 'img/slider/' + newWidth + '.jpg',
				text: ['Job','Formula 1','Phone','Movie'][slides.length % 4] + ' ' +
				['Hunting', 'Feeder', 'Category', 'Stub'][slides.length % 4]
			});
		};
		for (var i=0; i<4; i++) {
			$scope.addSlide();
		}

	}
);
