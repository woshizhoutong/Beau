app.controller('viewCdpComCtl', function ($scope, $uibModalInstance, cdpUsrMngtSvc, comId) {
	cdpUsrMngtSvc.findCompany(comId).then(function(response) {
		$scope.cModel = response.data;
	});
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});