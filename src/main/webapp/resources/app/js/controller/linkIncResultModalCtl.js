app.controller('linkIncResultModalCtl', function ($scope, $modalInstance, confirmationId, incCaseNum) {
	$scope.confirmationId = confirmationId;
	$scope.incCaseNum = incCaseNum;

	$scope.stayOnRpt = function () {
//		alert("stay on report");
		$modalInstance.close('stayOnRpt');
	};

	$scope.goToInc = function () {
//		alert("go to incident");
		$modalInstance.close('goToInc');
	};
});