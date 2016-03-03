app.controller('notifyModalCtl', function ($scope, $modalInstance, msg) {
	$scope.msg = msg;
	
	$scope.ok = function () {
		$modalInstance.close('OK');
	};
});