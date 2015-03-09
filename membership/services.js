/**
 * Created by wilso_000 on 12/10/2014.
 */

angular.module('membershipServices',['ngResource']).

    factory('membershipFactory', function ($resource) {
        return $resource('membership/memberships.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).

    factory('clubFactory', function ($resource) {
        return $resource('membership/clubs.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).

    factory('formFactory', function ($resource) {
        return $resource('membership/forms.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).


    service('sharedServices', function(membershipFactory,clubFactory) {
        var memberships = membershipFactory.query();
        var clubs = clubFactory.query();
        var clubID = 3;
        var membershipID = 3;

        return {
            getMemberships: function () {
                return memberships;
            },
            getClubs: function () {
                return clubs;
            },
            addMembership: function (value) {
                memberships.push(value);
            },
            addClub: function (value) {
                clubs.push(value);
            },
            incrementClubID: function() {
                clubID += 1;
            },
            incrementMembershipID: function() {
                membershipID += 1;
            },
            getCurrentMembershipID: function() {
                return membershipID;
            },
            getCurrentClubID: function() {
                return clubID;
            },
            deleteCurrentRecord:   function(index) {
                memberships.splice(index, 1);
            },
            updateCurrentMember:   function(index,value) {
                memberships[index] = value;
            },
            getCurrentMemberByID:   function(index) {
                return memberships[index];
            },
            getCurrentClubByID:   function(index) {
                return clubs[index];
            },
            deleteCurrentClubRecord:   function(index) {
                clubs.splice(index, 1);
            },
            updateCurrentClub:   function(index,value) {
                clubs[index].clubName = value;
            }
        }
    });


