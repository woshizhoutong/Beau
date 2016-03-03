editorApp.controller('openExistingQuestionsModal', function ($scope, $modalInstance, questionEditorService) {
	
	$scope.open = function () {
		console.log($scope.chosenVersionNum);
		if($scope.chosenVersionNum != null && $scope.chosenVersionNum != undefined){
			questionEditorService.getExistingQuestionsByVersionNum($scope.chosenVersionNum ).then(function(response){	
				console.log(response);
				$modalInstance.close(response);
			});
		}else{
			$modalInstance.close(null);
		}
		
	}; 
	
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	questionEditorService.getLastestVersionNum().then(function(response){
		$scope.versionNumList = response;
		console.log(response);
	});
	
})

