/**
 * Created by wilso_000 on 12/12/2014.
 */
'use strict';

jobHuntApp.controller('manageJobHuntCtrl', function ($scope,$http,$modal,$routeParams, companyFactory, sharedServices) {

    $scope.companies = sharedServices.getCompanies();
    $scope.contacts = sharedServices.getContacts();
    $scope.xxx = $routeParams._jobID;

    if ($routeParams._jobID == 0)
        $scope.paramFlag = "Add";
    else
        $scope.paramFlag = "Update";


    $scope.back = function () {
        window.history.back()
    };



    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openCalendar = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


    $scope.openCompany = function () {

        var modalInstance = $modal.open({
            templateUrl: 'manageCompany.html',
            controller: 'CompanyModalInstanceCtrl',
            size: 'sm',
            resolve: {
                _companies: function () {
                    return $scope.companies;
                }
            }
        });

        modalInstance.result.then(function (allCompanies) {
            $scope.companies = allCompanies;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openContact = function () {
        var modalInstance = $modal.open({
            templateUrl: 'manageContact.html',
            controller: 'ContactModalInstanceCtrl',
            size: 'lg',
            resolve: {
                _contacts: function () {
                    return $scope.contacts;
                }
            }
        });

        modalInstance.result.then(function (allContacts) {
            $scope.contacts = allContacts;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.manageJobhunt = function () {
        $scope.jobHuntInfo.companyName = $scope.selectedCompany.companyName;
        $scope.jobHuntInfo.contactName = $scope.selectedContact.contactName;
        $scope.jobHuntInfo.contactEmail = $scope.selectedContact.contactEmail;
        $scope.jobHuntInfo.contactPhone = $scope.selectedContact.contactPhone;

        if ($routeParams._jobID == -1) {
            sharedServices.incrementJobHuntID();
            $scope.jobHuntInfo.id = sharedServices.getCurrentJobHuntID();
            sharedServices.addJobHunt($scope.jobHuntInfo);
            window.history.back();
        }
        else {  //update
            sharedServices.updateCurrentJob($routeParams._jobID,$scope.jobHuntInfo);
            window.history.back();
        }
    };
})



// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('CompanyModalInstanceCtrl', function ($scope, $modalInstance, $http, _companies, sharedServices) {
    $scope._companies = _companies;

    $scope.ok = function () {
        sharedServices.incrementCompanyID();
        $scope.companyInfo.id = sharedServices.getCurrentCompanyID();
        sharedServices.addCompany($scope.companyInfo);
        $scope._companies = sharedServices.getCompanies();
        $scope.companyInfo = {};
    };

    $scope.cancel = function () {
        $modalInstance.close($scope._companies);
    };
})


.controller('ContactModalInstanceCtrl', function ($scope, $modalInstance, $http, _contacts, sharedServices) {
    $scope._contacts = _contacts;

    $scope.ok = function () {
        sharedServices.incrementContactID();
        $scope.contactInfo.id = sharedServices.getCurrentContactID();
        sharedServices.addContact($scope.contactInfo);
        $scope._contacts = sharedServices.getContacts();
        $scope.contactInfo = {};
    };

    $scope.cancel = function () {
        $modalInstance.close($scope._contacts);
    };
})

;

