app.directive('questionTemplate', function(QuestionService){
	return{
		restrict: 'E',
		scope: {
			versionNum: '=',
			reportId: '=',
			finalizeInterview: '&',
			stopInterview: '&'
		},
		templateUrl: 'resources/ng/itvTool/directives/questionTemplate.html',
		controller: function($scope, $modal){
			
			$scope.currentQstNum = 1;
			$scope.lastQstNums = [];
			$scope.isLast = false;
			$scope.answer = {};

			QuestionService.getTotalNumOfParentQuestion($scope.versionNum).then(function(response){
				$scope.totalNumOfParentQuestion = response;
			});
			
			QuestionService.getQuestionByQstNum($scope.reportId, $scope.versionNum, $scope.currentQstNum).then(function(response){
				$scope.question = response; 
				$scope.answer = QuestionService.getCurrentAnswerWithQuestion(response);
			});
					
			$scope.submitQuestion = function (answer){
				QuestionService.saveAnswer($scope.question, $scope.reportId, answer).then(function(response){
					$scope.lastQstNums.push($scope.currentQstNum);
					if(response != ''){
						$scope.currentQstNum = parseInt(response);
					}else{
						$scope.currentQstNum = $scope.currentQstNum + 1;
						if ($scope.currentQstNum == $scope.totalNumOfParentQuestion) {
							$scope.isLast = true;
						}
					}
					
					//go to the next question
					if($scope.currentQstNum > $scope.totalNumOfParentQuestion){
						$scope.finalizeInterview();
					}else{
						QuestionService.getQuestionByQstNum($scope.reportId, $scope.versionNum, $scope.currentQstNum).then(function(response){
							$scope.question = response; 
							$scope.answer = QuestionService.getCurrentAnswerWithQuestion(response);
						});
					}
				});
			};
			
			$scope.back = function() {
				var lastQstNum = $scope.lastQstNums.pop();
				$scope.currentQstNum = lastQstNum;
				QuestionService.getQuestionByQstNum($scope.reportId, $scope.versionNum, lastQstNum).then(function(response){
					$scope.question = response; 
					$scope.answer = QuestionService.getCurrentAnswerWithQuestion(response);
				});
			};
			
			$scope.stop = function() {
				$scope.stopInterview();
			}
			
			$scope.$watch('currentQstNum', function(newVal) {
				if (newVal == $scope.totalNumOfParentQuestion) {
					$scope.isLast = true;
				} else {
					$scope.isLast = false;
				}
			});
		}
	}
	
});