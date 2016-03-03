app.directive('dropdownQuestion', function(){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: 'resources/ng/itvTool/directives/dropdownQuestion.html',
		controller: function($scope, $element){
			//Read the saved data into the form
			$scope.inputAnswer  = $scope.directiveAnswer;
			
			//change the data when change the answer
			$scope.fetchAnswer = function(){
				$scope.directiveAnswer = [];
				if($scope.inputAnswer[0] != null){
					$scope.directiveAnswer.push(parseInt($scope.inputAnswer[0]));	
				}
			};
		}
	}
	
});