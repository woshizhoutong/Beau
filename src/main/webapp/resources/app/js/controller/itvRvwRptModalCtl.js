app.controller('itvRvwRptModalCtl', function ($scope, $modalInstance, itvSvc, rptSvc, itv) {
	rptSvc.getRptById(itv.rptId).then(function(response) {
		$scope.rptVM = response.data;
	});
	
	$scope.next = function () {
		itvSvc.finishReviewRpt(itv.rptId, $scope.rptVM).then(function(response) {
			if (response.status == 'SUCCESS') {
				$modalInstance.close();
			} else {
				alert("Sorry, server is temporarily unavailable, please try later!");
			}
		});
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});