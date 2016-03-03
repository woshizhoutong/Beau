app.directive('textareaQuestion', function(){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: 'resources/ng/itvTool/directives/textareaQuestion.html',
		controller: function($scope, $element){
			
		}
	}
	
});