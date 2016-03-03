app.controller('viewCdpUsrRqtCtl', function ($scope, $uibModalInstance, uModel) {
	$scope.uModel = uModel;
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});