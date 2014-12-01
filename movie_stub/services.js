/**
 * Created by wilso_000 on 11/25/2014.
 */
angular.module('movieStubServices',['ngResource']).

	factory('movieStubFactory', ['$resource', function ($resource) {
		return $resource('movie_stub/movies.json', {}, {
			query: {method:'GET', isArray:true}
		});
	}]).

	service('sharedFunc', function(movieStubFactory) {
		var bookings = [];
		var movies = movieStubFactory.query();
		var movieid = 10;

		return {
			getMovieID: function() {
				return movieid;
			},
			incrementMovieID: function() {
				movieid += 1;
			},
			getBookings: function () {
				return bookings;
			},
			addMovie: function (value) {
				movies.push(value);
			},
			addBooking: function (value) {
				bookings.push(value);
			},
			getMovies: function () {
				return movies;
			},
			getMovieById: function (id) {
				for (var i = 0; i < movies.length; i++) {
					var movie = movies[i];
					if (movie.id == id) {
						return movie;
					}
				}
			}


		}
	})
;

