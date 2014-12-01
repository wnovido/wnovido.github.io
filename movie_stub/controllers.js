/**
 * Created by wilso_000 on 11/25/2014.
 */
'use strict';
angular.module('myApp.view4', ['ngRoute', 'ngResource', 'movieStubServices']).

	controller('MovieStubCtrl', function($scope, movieStubFactory, $location, sharedFunc) {
		$scope.movies = sharedFunc.getMovies();
		$scope.currMovie = null;

		// A simple back function, that will help us navigate between views
		$scope.back = function () {
			window.history.back()
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
		$scope.isActivePath = function(route) {
			return ($location.path()).indexOf(route) >= 0;
		};
	}).


	controller("movieDetailsController", function ($scope, $routeParams, sharedFunc) {
		$scope.currMovie = sharedFunc.getMovieById($routeParams.id);

		$scope.getCount = function(n) {
			return new Array(n);
		};

		$scope.back = function () {
			window.history.back()
		};

	}).


	controller("bookTicketsController", function($scope, $http, $location, $routeParams, sharedFunc) {
		$scope.currMovie = sharedFunc.getMovieById($routeParams.id);
		$scope.onlyNumbers = /^\d+$/;

		$scope.formData = {};
		$scope.formData.movie_id = $scope.currMovie.id;
		$scope.formData.movie_name = $scope.currMovie.name;
		$scope.formData.date = "Today";

		$scope.processForm = function() {
			$scope.bookings = sharedFunc.addBooking($scope.formData);
			$location.path("/bookings");
		}; //end processForm

		$scope.back = function () {
			window.history.back()
		};

	}).


	controller("bookingDetailsController", function($scope, sharedFunc) {
		$scope.bookings = sharedFunc.getBookings();
		$scope.back = function () {
			window.history.back()
		};
	}).


	controller("addMovieController", function($scope, sharedFunc) {

		$scope.movieData = {};
		$scope.movieData.id = 0;
		$scope.movieData.name = "";
		$scope.movieData.rating = 0;
		$scope.movieData.availability = 0;
		$scope.movieData.review = "";
		$scope.movieData.thumb = "";


		$scope.processMovie = function() {
			sharedFunc.incrementMovieID();
			$scope.movieData.id = sharedFunc.getMovieID();
			$scope.movies = sharedFunc.addMovie($scope.movieData);
			window.history.back();
		}; //end processForm

		$scope.back = function () {
			window.history.back()
		};
	})

;


