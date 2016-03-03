app.controller('usrMngtNavCtl', function ($scope, $location) {
	$scope.initialPath = $location.path();
	$scope.showUsers = function(path) {
		$location.path(path);
	};
});