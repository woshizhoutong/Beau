editorApp.controller('addQuestionModal', function ($scope, $modalInstance, questionEditorService) {
	
	$scope.addQuestion = function () {
		var isSequenceChnaged = false;
		if($scope.sequenceNum === undefined){
			isSequenceChnaged = false;
			$scope.newQuestion.qstNum = ($scope.allQuestionNumList.length + 1).toString();
		}else{
			isSequenceChnaged = true;
			$scope.newQuestion.qstNum = $scope.sequenceNum;
		}
		console.log($scope.newQuestion);
	
		$modalInstance.close(
			{
				"newQuestion": $scope.newQuestion,
				"isSequenceChnaged": isSequenceChnaged,
			});
	}; 
	
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	 
	// initialize the question object
	$scope.newQuestion = {};
	$scope.newQuestion.answerDataType = null;
	$scope.newQuestion.childQuestion = false;
	$scope.newQuestion.editChildQuestionModels = [];
	$scope.newQuestion.editOptionModels = [];
	$scope.newQuestion.loc = "";
	$scope.newQuestion.qstInstruction = "";
	$scope.newQuestion.qstNum = "";
	$scope.newQuestion.qstTitle = "";
	$scope.newQuestion.qstId = null;
	$scope.newQuestion.qstType = "";
	$scope.newQuestion.versionNum = null;
	
	//List of qstType
	questionEditorService.getQuestionTypeList().then(function(response){
		$scope.qstTypeList = response;
		console.log($scope.qstTypeList);
	});
	
	//List of answer data type
	questionEditorService.getAnswerDataTypeList().then(function(response){
		$scope.answerDataTypeList = response;
		console.log($scope.answerDataTypeList);
	});
	
	
	
	
	//Insert - all question list:
	$scope.allQuestionNumList = questionEditorService.getAllQuestionNumList();
	
	
})

