app.controller('processCdpUsrRqtCtl', function ($scope, $uibModalInstance, cdpUsrMngtSvc, sltValSvc, uModel) {
	$scope.uModel = uModel;
	sltValSvc.getApprovedCompanies().then(function(response) {
		$scope.companies = response.data;
		angular.forEach($scope.companies, function(item) {
			if (uModel.company.id === item.id) {
				$scope.uModel.company = item;
			}
		});
	});
	
	
	$scope.approve = function () {
		cdpUsrMngtSvc.approveUser($scope.uModel).then(function(response) {
			if (response.status == 'SUCCESS') {
				$uibModalInstance.close(response.data);
			} else {
				alert("Sorry, server is temporarily unavailable, please try later!");
			}
		});
	};
	
	$scope.reject = function () {
		cdpUsrMngtSvc.rejectUser($scope.uModel.id).then(function(response) {
			if (response.status == 'SUCCESS') {
				$uibModalInstance.close(response.data);
			} else {
				alert("Sorry, server is temporarily unavailable, please try later!");
			}
		});
	};
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});