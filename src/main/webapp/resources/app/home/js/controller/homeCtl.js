app.controller('homeCtl', function ($scope, $location, currUsrSvc, newsSvc, $uibModal, $log) {
	currUsrSvc.getCurrentUserAuthorities().then(function(response) {
		if (response.data.indexOf("VIEW_USER_MANAGEMENT") > -1) {
			$scope.hasViewUsrMngtAuth = true;
		} else {
			$scope.hasViewUsrMngtAuth = false;
		}
	});
	
	newsSvc.listNmrsNewReports().then(function(response) {
		$scope.newReports = response.data;
	});
	
	newsSvc.listCdpNewAccountRequests().then(function(response) {
		$scope.newRequests = response.data;
	});
	
	newsSvc.listCdpNewDatasets().then(function(response) {
		$scope.newUploaded = response.data;
	});
	
	$scope.viewReport = function (rptId) {
		window.location.href = '/' + getRootFolderName() + '/reports#/oriRpt/' + rptId;
	}
	
	$scope.viewRequest = function () {
		window.location.href = '/' + getRootFolderName() + '/userManagement#/cdp';
	}
	
	$scope.viewDataset = function (comId) {
		window.location.href = '/' + getRootFolderName() + '/datasets#/comDatasets/' + comId;
	}
});