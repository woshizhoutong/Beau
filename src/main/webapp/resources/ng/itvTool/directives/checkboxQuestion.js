app.directive('checkboxQuestion', function(){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: 'resources/ng/itvTool/directives/checkboxQuestion.html',
		controller: function($scope, $element){

			//Read the saved data into the form
			var savedData = $scope.directiveAnswer;
			var savedDataObj = {};
			for(var i=0; i<savedData.length; i++){
				savedDataObj[savedData[i]] = true;
			}
			$scope.inputAnswer = savedDataObj;
			//change the data when change the answer by checking the box
			$scope.fetchAnswer = function(){
				$scope.chosenOptions = [];
				for(var property in $scope.inputAnswer){
					if(($scope.inputAnswer.hasOwnProperty(property)) && ($scope.inputAnswer[property] == true)){
						var value = parseInt(property);
						$scope.chosenOptions.push(value);
					}
				}
				$scope.directiveAnswer = $scope.chosenOptions;
			};
		}
	}
	
});