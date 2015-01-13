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
})



// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ClubModalInstanceCtrl', function ($scope, $modalInstance, $http, $modal, _clubs, sharedServices) {
    $scope._clubs = _clubs;
    $scope.shouldBeOpen = true;

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

    $scope.getNewName = function ($event) {
        $scope.newName = $event.target.value.trim();
    };

    $scope.updateClub = function (_index) {
        if ($scope.newName === undefined)
            alert("Club Name Empty!");
        else {
            sharedServices.updateCurrentClub(_index,$scope.newName);
            $scope._clubs = sharedServices.getClubs();
            $scope.clubInfo = {};
        }
    };


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

