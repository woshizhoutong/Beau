editorApp.directive('textQuestion', function(editQuestionService){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			updateQuestionSequence: '&',
			updateChildQuestionShowOrder: '&',
			deleteQuestion:'&',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: '../resources/ng/itvEditor/directives/textQuestion.html',
		controller: function($scope, $element, $modal){
//			$scope.directiveAnswer = [];
			
			//set edit question icon to invisible
			$scope.editQuestionVisible = false;
			
			$scope.showEditQuestion = function(){
				$scope.editQuestionVisible = true;
			};
			
			$scope.hideEditQuestion = function(){
				$scope.editQuestionVisible = false;
			};
			
			// if this question is a child question - it determines if it shows the add child question icon
			$scope.isChildQuestion = $scope.question.childQuestion;
			
			$scope.openEditQuestionModal = function () {

			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/editQuestionModal.html',
				      controller: 'editQuestionModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  question: function () {
				    		  return angular.copy($scope.question);
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (response) {
			    	editQuestionService.updateQuestionWithoutSequenceChange($scope.question, response.newQuestion);
			    	if(response.isSequenceChanged == true){
			    		$scope.updateQuestionSequence({qstDataForUpdate: response});
			    	}
			    	if(response.isShowOrderChanged == true){
			    		$scope.updateChildQuestionShowOrder({qstDataForUpdate: response});
			    	}
			    	}, function () {
		        });
			};
			
			$scope.openDeleteModal = function (item) {
			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/deleteConfirmModal.html',
				      controller: 'deleteConfirmModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  item: function () {
				    		  return angular.copy(item);
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (item) {
	    			$scope.deleteQuestion({chosenDeleteQuestion: item});
			    	}, function () {
		        });
			};
			
			
			$scope.openAddChildQuestionModal = function () {
			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/addChildQuestionModal.html',
				      controller: 'addChildQuestionModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  parentQuestion: function () {
				    		  return angular.copy($scope.question);
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (newChildQuestions) {
			    	$scope.question.editChildQuestionModels = newChildQuestions;
			    	}, function () {
		        });
			};
		}
	}
	
});