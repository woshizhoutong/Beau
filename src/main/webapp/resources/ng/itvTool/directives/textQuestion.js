app.directive('textQuestion', function(){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: 'resources/ng/itvTool/directives/textQuestion.html',
		controller: function($scope, $element){
			
		}
	}
	
});