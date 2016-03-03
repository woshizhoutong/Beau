app.controller('itvStartItvModalCtl', function ($scope, $modalInstance, itvSvc, itv) {
	$scope.confirmationId = itv.confirmationId;
	
	$scope.startItv = function () {
		itvSvc.startItv(itv.itvId).then(function(response) {
			if (response.status == 'SUCCESS') {
				itv.questionnaireVersionNum = response.data;
				$modalInstance.close(itv);
			} else {
				alert("Sorry, server is temporarily unavailable, please try later!");
			}
		});
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});