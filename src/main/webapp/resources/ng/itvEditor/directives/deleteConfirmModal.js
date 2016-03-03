editorApp.controller('deleteConfirmModal', function ($scope, $modalInstance, item) {

	$scope.deleteThisItem = function () {
		$modalInstance.close(item);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
})

