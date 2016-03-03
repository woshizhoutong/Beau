editorApp.directive('questionTemplate', function(editOptionService, questionTemplateService){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			highlightOptNum: '=',
			updateQuestionSequenceTrg: '&',
			updateFlowchartTrg: '&',
			deleteQuestionTrg:'&',
			highlightAnswer: '='
		},
		templateUrl: '../resources/ng/itvEditor/directives/questionTemplate.html',
		controller: function($scope, $element){
			$scope.updateQuestionSequence = function(qstDataForUpdate){
				$scope.updateQuestionSequenceTrg({qstDataForUpdate: qstDataForUpdate});
			};
			
			$scope.updateFlowchart = function(){
				$scope.updateFlowchartTrg();
			};
			
			$scope.deleteQuestion = function(chosenDeleteQuestion){
				if(chosenDeleteQuestion.childQuestion == true){
					questionTemplateService.deleteChildQuestion($scope.question, chosenDeleteQuestion);
		    		$scope.updateFlowchartTrg();
				}else{
					$scope.deleteQuestionTrg({chosenDeleteQuestion: chosenDeleteQuestion});
				}
			};
			
			$scope.updateChildQuestionShowOrder = function(qstDataForUpdate){
				questionTemplateService.updateChildQuestionWithShowOrderChange(
						$scope.question, qstDataForUpdate.newQuestion, qstDataForUpdate.oldQstNum);
				console.log($scope.question);
			}

		}
	}
	
});