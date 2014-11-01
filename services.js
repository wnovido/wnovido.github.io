/**
 * Created by wilso_000 on 10/24/2014.
 */

angular.module('myApp.services', [])
    .factory('ergastAPIservice', function($http) {

        var ergastAPI = {};

        ergastAPI.getDrivers = function() {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
            });
        }

        ergastAPI.getDriverDetails = function(id) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
            });
        }

        ergastAPI.getDriverRaces = function(id) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
            });
        }

        return ergastAPI;
    });
