/**
 * Created by wilso_000 on 11/14/2014.
 */
var phonecatServices = angular.module('phonecatServices',['ngResource']);

phonecatServices.factory('Phone', ['$resource',
	function($resource) {
		return $resource('phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	}]);
