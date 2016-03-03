app.controller('confirmDangerModalCtl', function ($scope, $uibModalInstance, msg) {
	$scope.msg = msg;
	
	$scope.confirm = function () {
		$uibModalInstance.close('CONFIRM');
	};
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});