app.directive('questionnaire', function(QuestionService){
	return{
		restrict: 'E',
		scope: {
			questions: '=',
			answers: '=',
		},
		templateUrl: 'resources/ng/itvTool/directives/questionnaire.html',
		controller: function($scope, $modal){
			
//			$scope.answers = $scope.answers;
		}
	}
	
});