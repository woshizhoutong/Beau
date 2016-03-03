app.controller('schItvModalCtl', function ($scope, $modalInstance, rptSvc, sltValSvc, usrSvc, rptId, confirmationId, bestTimeToCallStart, datepickerPopupConfig) {
	$scope.rptId = rptId;
	$scope.confirmationId = confirmationId;
	$scope.bestTimeToCallStart = bestTimeToCallStart;
	$scope.itvVM = {};
	
	/*Start of initializing datepickers*/
	$scope.dateOptions = {
		'starting-day': 0,
		'show-weeks': false			
	};
	datepickerPopupConfig.closeText = 'Close';
	
	$scope.stdOpen = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.stdOpened = true;
	};
	
	/*Disable weekend selection*/
	$scope.stdDisabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};
	
	var today = new Date();
	var todayOfNextYear = new Date();
	todayOfNextYear.setDate(today.getYear() + 1);
	$scope.stdMinDate = today;
	$scope.stdMaxDate = todayOfNextYear;
	/*End of initializing datepickers*/
	
	/*Start of initializing drop downs*/
	sltValSvc.getSelectionItemsByName('Timezone').then(function(items) {
		$scope.itvVM.scheduledTimezone = {};
		$scope.timezones = items;
	});
	
	usrSvc.listByRoleType('SME_EXPERT').then(function(response) {
		$scope.itvVM.interviewer = {};
		$scope.interviewers = response.data;
	});
	
	usrSvc.listByRoleType('SME_ASSISTANT').then(function(response) {
		$scope.itvVM.scriber = {};
		$scope.scribers = response.data;
	});
	/*Start of initializing drop downs*/
	
	$scope.schItv = function () {
		rptSvc.schItv($scope.rptId, $scope.itvVM).then(function(response) {
			if (response.status == 'SUCCESS') {
				$modalInstance.close(response.data.scheduledInterviewTime);
			} else {
				alert("Sorry, server is temporarily unavailable, please try later!");
			}
		});
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});