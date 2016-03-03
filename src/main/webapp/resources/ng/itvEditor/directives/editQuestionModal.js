editorApp.controller('editQuestionModal', function ($scope, $modalInstance, $filter, editQuestionService, question) {
	
	$scope.updateQuestion = function () {
		
		var isSequenceChanged = false;
		var isShowOrderChanged = false;
		// if it is child question, then check showOrdernum
		// if it's parent question, then check sequenceNum
		if($scope.newQuestion.childQuestion == false){
			if($scope.newQuestion.qstNum != $scope.sequenceNum){
				isSequenceChanged = true;
				$scope.newQuestion.qstNum = $scope.sequenceNum;
			}
		}else{
			if($scope.newQuestion.qstNum != $scope.showOrderNum){
				isShowOrderChanged = true;
				$scope.newQuestion.qstNum = $scope.showOrderNum;
			}
		}
		
		$modalInstance.close(
			{
				"newQuestion": $scope.newQuestion,
				"oldQstNum": question.qstNum,
				"isSequenceChanged": isSequenceChanged,
				"isShowOrderChanged": isShowOrderChanged
			});
	};
	
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	$scope.newQuestion = angular.copy(question);
	
	//only parent question can edit sequence
	if($scope.newQuestion.childQuestion == true){
		$scope.editSequenceVisible = false;
	}else{
		$scope.allQstNumList = editQuestionService.getAllQuestionNumList();
		$scope.editSequenceVisible = true;
		$scope.sequenceNum = $scope.newQuestion.qstNum;
	}
	
	//only child question can edit showOrder
	if($scope.newQuestion.childQuestion == false){
		$scope.editShowOrderVisible = false;
	}else{
		$scope.allChildQstNumList = editQuestionService.getAllChildQuestionNumList($scope.newQuestion.parentQstNum);
		$scope.showOrderNum = $scope.newQuestion.qstNum;
		$scope.editShowOrderVisible = true;
	}
	
})

