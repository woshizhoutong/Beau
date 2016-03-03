app.controller('datasetsNavCtl', function ($scope, $location, cdpComSvc) {
	var path = $location.path();
	$scope.initialComId = path.slice(path.lastIndexOf('/') + 1);
	$scope.showCompanyDatasets = function(comId) {
		$location.path('/comDatasets/' + comId);
	};
	
	cdpComSvc.listCompanies().then(function(response) {
		$scope.companies = response.data;
	});
});