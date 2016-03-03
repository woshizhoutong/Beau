app.controller('incDetailCtl', function ($scope, incSvc) {
	
	$scope.incDetail = {};
	
	$scope.loadIncDetail = function(incId) {
		incSvc.getIncById(incId).then(function(response) {
			console.log(response.data);
			$scope.incDetail = response.data;
		});
	};
	
	
});