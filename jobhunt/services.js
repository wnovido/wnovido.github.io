/**
 * Created by wilso_000 on 12/10/2014.
 */

angular.module('jobHuntServices',['ngResource']).

    factory('jobHuntFactory', function ($resource) {
        return $resource('jobhunt/jobhunts.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).

    factory('companyFactory', function ($resource) {
        return $resource('jobhunt/companies.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).

    factory('contactFactory', function ($resource) {
        return $resource('jobhunt/contacts.json', {}, {
            query: {method:'GET', isArray:true}
        });
    }).

    service('sharedServices', function(jobHuntFactory,companyFactory,contactFactory) {
        var jobhunts = jobHuntFactory.query();
        var companies = companyFactory.query();
        var contacts = contactFactory.query();
        var companyID = 3;
        var jobHuntID = 3;
        var contactID = 3;

        return {
            getJobHunts: function () {
                return jobhunts;
            },
            getCompanies: function () {
                return companies;
            },
            getContacts: function () {
                return contacts;
            },
            addJobHunt: function (value) {
                jobhunts.push(value);
            },
            addCompany: function (value) {
                companies.push(value);
            },
            addContact: function (value) {
                contacts.push(value);
            },
            incrementCompanyID: function() {
                companyID += 1;
            },
            incrementContactID: function() {
                contactID += 1;
            },
            incrementJobHuntID: function() {
                jobHuntID += 1;
            },
            getCurrentJobHuntID: function() {
                return jobHuntID;
            },
            getCurrentCompanyID: function() {
                return companyID;
            },
            getCurrentContactID: function() {
                return contactID;
            },
            deleteCurrentJob:   function(index) {
                jobhunts.splice(index, 1);
            },
            updateCurrentJob:   function(index,value) {
                jobhunts[index] = value;
            }

        }
    });


