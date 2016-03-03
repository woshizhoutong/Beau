itvToolApp.controller('ItvToolController', ['$scope', 'QuestionService', '$routeParams', '$location', 
                                      function ($scope, QuestionService, $routeParams, $location) {
	
	$scope.currentQstNum = 1;
	$scope.nextQstNum = parseInt($routeParams.qstNum) + 1;
	$scope.answer = {};

	QuestionService.getTotalNumOfParentQuestion($routeParams.versionNum).then(function(response){
		$scope.totalNumOfParentQuestion = response;
	});
	
	QuestionService.getInterviewByInterviewNum($routeParams.interviewNum).then(function(response){
		if(response == null){
			$location.path("/error");
		}else{
			$scope.interview = response;
			
			QuestionService.getQuestionByQstNum($routeParams.interviewNum, $routeParams.versionNum, $routeParams.qstNum).then(function(response){
				$scope.question = response;
				console.log($scope.question);
				$scope.answer = QuestionService.getCurrentAnswerWithQuestion(response);
				console.log($scope.answer);
			});
			
		}
	});
	
	$scope.submitQuestion = function (answer){

		QuestionService.saveAnswer($scope.question, $scope.interview.interviewNum, answer).then(function(response){

		});
		
		//go to the next question
		if($routeParams.qstNum == $scope.totalNumOfParentQuestion){
			alert("Interview Accomplished!");
		}else{
			$location.path("/" + $routeParams.interviewNum + "/" + $routeParams.versionNum + "/" + $scope.nextQstNum);
		}
		
	};
	
}]);