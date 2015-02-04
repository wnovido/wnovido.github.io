/**
 * Created by wilso_000 on 12/12/2014.
 */
'use strict';

jobHuntApp.controller('manageMemberCtrl', function ($scope,$http,$modal,$routeParams,clubFactory,sharedServices) {

    $scope.clubs = sharedServices.getClubs();
    $scope.shouldBeOpen = true;

    if ($routeParams._ID == -1)
        $scope.paramFlag = "Add";
    else {
        $scope.paramFlag = "Update";
        //Get member info by id and bind to $scope.membershipInfo
        $scope.membershipInfo = sharedServices.getCurrentMemberByID($routeParams._ID);
        $scope.selectedClub = $scope.membershipInfo.clubID;
    }

    $scope.back = function () {
        window.history.back()
    };


    $scope.maxDate = new Date();
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



    $scope.openClub = function () {

        var modalInstance = $modal.open({
            templateUrl: 'manageClub.html',
            controller: 'ClubModalInstanceCtrl',
            size: 'md',
            resolve: {
                _clubs: function () {
                    return $scope.clubs;
                }
            }
        });

        modalInstance.result.then(function (_ret) {
            $scope.clubs = _ret;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.manageMember = function () {
        var dateReg = $scope.membershipInfo.dateOfRegistration;

        //if (isFutureDate(dateReg)) {
        //    alert("Future Date");
        //    return;
        //}

        if ($scope.membershipInfo.dateOfRegistration === undefined) {
            alert("Date of Registration must have a value");
            return;
        }

        if ($scope.membershipInfo.memberName === undefined) {
            alert("Member Name must have a value");
            return;
        }

        if ($scope.membershipInfo.memberEmail === undefined) {
            alert("Member Email must have a value");
            return;
        }


        if ($scope.membershipInfo.memberPhone === undefined) {
            alert("Member Phone must have a value");
            return;
        }


        $scope.membershipInfo.clubID = $scope.selectedClub;

        if ($routeParams._ID == -1) {
            sharedServices.incrementMembershipID();
            $scope.membershipInfo._id = sharedServices.getCurrentMembershipID();
            sharedServices.addMembership($scope.membershipInfo);
            window.history.back();
        }
        else {  //update
            sharedServices.updateCurrentMember($routeParams._ID,$scope.membershipInfo);
            window.history.back();
        }
    };

    //alert(isFutureDate("02/03/2014"); // true
    //alert(isFutureDate("01/01/2014"); // false

    function isFutureDate(idate){
        var today = new Date().getTime(),
            idate = idate.split("/");

        idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
        return (today - idate) < 0 ? true : false;
    }

})



.controller('ClubModalInstanceCtrl', function ($scope, $modalInstance, $http, $modal, _clubs, sharedServices) {
    $scope._clubs = _clubs;
    $scope.shouldBeOpen = true;
        $scope.txtClubName = "";

    //add
    $scope.ok = function () {
        if ($scope.clubInfo.clubName === undefined)
            alert("Club Name Empty!");
        else {
            sharedServices.incrementClubID();
            $scope.clubInfo._id = sharedServices.getCurrentClubID();
            sharedServices.addClub($scope.clubInfo);
            $scope._clubs = sharedServices.getClubs();
            $scope.clubInfo = {};
        }
    };

    $scope.cancel = function () {
        $modalInstance.close($scope._clubs);
    };



    //update
    $scope.updateClub = function (_index,_clubName) {
        if (_clubName === '' || _clubName === undefined)
            alert("Club Name Empty!" + _clubName);
        else {
            sharedServices.updateCurrentClub(_index,_clubName);
            $scope._clubs = sharedServices.getClubs();
            $scope.clubInfo = {};
        }
    };



    //delete
    $scope.openDeleteConfirm = function (size,_index) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalDeleteCtrl',
            size: size,
            resolve: {
                _index: function () {
                    return _index;
                }
            }
        });

        modalInstance.result.then(function (retVal) {
            $scope._clubs = retVal;
            $scope.clubName = '';
            $scope.shouldBeOpen = true;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


})


.controller('ModalDeleteCtrl', function ($scope, $http, $modalInstance, _index, sharedServices) {
    $scope.ok = function () {
        sharedServices.deleteCurrentClubRecord(_index);
        $modalInstance.close(sharedServices.getClubs());
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

})
;

