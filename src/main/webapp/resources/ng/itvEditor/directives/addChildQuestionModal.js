editorApp.controller('addChildQuestionModal', function ($scope, $modalInstance, parentQuestion, questionEditorService) {
	
	$scope.addQuestion = function () {
		existingChildQuestions.push($scope.newQuestion);
		$modalInstance.close(existingChildQuestions);
	}; 
	
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	var existingChildQuestions = parentQuestion.editChildQuestionModels;
	// initialize the child question object
	$scope.newQuestion = {};
	$scope.newQuestion.answerDataType = null;
	$scope.newQuestion.childQuestion = true;
	$scope.newQuestion.editChildQuestionModels = [];
	$scope.newQuestion.editOptionModels = [];
	$scope.newQuestion.qstInstruction = "";
	$scope.newQuestion.qstNum = parentQuestion.qstNum + "." + (existingChildQuestions.length + 1);
	$scope.newQuestion.parentQstNum = parentQuestion.qstNum;
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
//	$scope.allQuestionNumList = questionEditorService.getAllQuestionNumList();
	
	
})

