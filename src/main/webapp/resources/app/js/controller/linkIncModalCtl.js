app.controller('linkIncModalCtl', function ($scope, $modalInstance, incSvc, rptSvc, rptId, confirmationId, timeOfEvent) {
	$scope.rptId = rptId;
	$scope.confirmationId = confirmationId;
	$scope.timeOfEvent = timeOfEvent;
	
	$scope.range = 3; //set default time range.
	// Initialize incident list using default time range
	incSvc.getIncsByTimeAndRange(timeOfEvent, $scope.range).then(function(response) {
		$scope.incs = response.data;
	});
	
	$scope.incDetail = {};
	
	$scope.setLinkIncWay = function (linkIncWay) {
		$scope.linkIncWay = linkIncWay;
	};
	
	$scope.refreshIncs = function() {
		incSvc.getIncsByTimeAndRange(timeOfEvent, $scope.range).then(function(response) {
			$scope.incs = response.data;
		});
	};
	
	$scope.setSelectedInc = function($index) {
		$scope.selectedInc = $scope.incs[$index];
	};
	
	$scope.toggleIncDetail = function(panelOpened, incId) {
		if (!panelOpened) {
			incSvc.getIncById(incId).then(function(response) {
				console.log(response.data);
				$scope.incDetail = response.data;
			});
		}
	}
	
	$scope.linkInc = function () {
		if ($scope.linkIncWay === 'CREATE_NEW') {
			rptSvc.linkRptToNewInc($scope.rptId).then(function(response) {
				if (response.status == 'SUCCESS') {
					$modalInstance.close(response.data.caseNum);
				} else {
					alert("Sorry, server is temporarily unavailable, please try later!");
				}
			});
		} else if ($scope.linkIncWay === 'SELECT_FROM_EXISTING') {
			rptSvc.linkRptToExistingInc($scope.rptId, $scope.selectedInc.incidentId).then(function(response) {
				if (response.status == 'SUCCESS') {
					$modalInstance.close(response.data.caseNum);
				} else {
					alert("Sorry, server is temporarily unavailable, please try later!");
				}
			});
		}
		
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});