itvToolApp.controller('InterviewController', ['$scope', '$location', function ($scope, $location) {
                                 
	$scope.interviewToolShow = false;
	
	$scope.start = function(interviewNum){
		QuestionService.getInterviewByInterviewNum($scope.interviewNum).then(function(response){
			alert("!");
			if(response == null){
				alert("interview not found!");
			}else{
				$scope.interview = response;
				$scope.interviewToolShow = true;
			}
		});
	};                         
	
	
}]);