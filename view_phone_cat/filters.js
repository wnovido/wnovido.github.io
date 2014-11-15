/**
 * Created by wilso_000 on 11/14/2014.
 */
angular.module('phonecatFilters',[]).

filter('checkmark', function() {
	return function(input) {
		return input ? '\u2713' : '\u2718';
	};
});


