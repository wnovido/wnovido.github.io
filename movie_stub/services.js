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

		return {
			getBookings: function () {
				return bookings;
			},
			setBookings: function (value) {
				bookings = value;
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

