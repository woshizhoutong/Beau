app.controller('viewCcpmUsrCtl', function ($scope, $uibModalInstance, ccpmUsrMngtSvc, uId) {
	ccpmUsrMngtSvc.findUser(uId).then(function(response) {
		$scope.uModel = response.data;
	});
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});