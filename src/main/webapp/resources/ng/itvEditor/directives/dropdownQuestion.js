editorApp.directive('dropdownQuestion', function(editOptionService, editQuestionService){
	return{
		restrict: 'E',
		scope: {
			question: '=',
			highlightOptNum: '=highlightOptNum',
			updateQuestionSequence: '&',
			updateChildQuestionShowOrder: '&',
			updateFlowchart:'&',
			deleteQuestion:'&',
			directiveAnswer: '=bindingAnswer'
		},
		templateUrl: '../resources/ng/itvEditor/directives/dropdownQuestion.html',
		controller: function($scope, $element, $modal, $filter){

			var optionToEdit;
			// get the current option by wathing the showAnswer (chosen answer)
			$scope.$watch('showAnswer', function(newData, oldData){
				if(newData != undefined && newData != null){
					optionToEdit = newData;
					//determine if it shows the orderUp and orderDown according to current option
					updateVisibilityOfUpAndDownArrow(optionToEdit);
				}
			});
			
			$scope.$watch("directiveAnswer", function() {
				if($scope.directiveAnswer.length > 0){
					$scope.showAnswer = $filter('filter')($scope.question.editOptionModels, {optNum: $scope.directiveAnswer[0]})[0]; 
				}else{
					$scope.showAnswer = null
				}
			});
			
			$scope.$watch("highlightOptNum", function(newData) {
				var allOption = $scope.question.editOptionModels;
				$scope.makeHighlight = false;
				for(var i=0; i<allOption.length; i++){
					if(allOption[i].optNum == newData){
						$scope.makeHighlight = true;
					}
				}
			});
			
			//set  edit icon to invisible
			$scope.editOptionVisible = false;
			
			// set edit icon to visible when mouse enters
			$scope.showEdit = function(){
				if($scope.showAnswer != null && ($scope.showAnswer != undefined)){
					$scope.editOptionVisible = true;
				}
			};
			// set edit icon to invisible when mouse leaves
			$scope.hideEdit = function(){
				$scope.editOptionVisible = false;
			};
			
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

			$scope.moveOptionShowOrderUp = function(){
				var oldOrder = optionToEdit.showOrder;
				var newOrder = oldOrder - 1;
				optionToEdit.showOrder = newOrder;
				editOptionService.updateOptionShowOrderChange(oldOrder, newOrder, $scope.question);
				
				//update the visibility of up and down arrow
				updateVisibilityOfUpAndDownArrow(optionToEdit);
			}
			
			$scope.moveOptionShowOrderDown = function(option){
				var oldOrder = optionToEdit.showOrder;
				var newOrder = oldOrder + 1;
				optionToEdit.showOrder = newOrder;
				editOptionService.updateOptionShowOrderChange(oldOrder, newOrder, $scope.question);
				
				//update the visibility of up and down arrow
				updateVisibilityOfUpAndDownArrow(optionToEdit);
			}
			
			$scope.openEditOptionModal = function () {
			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/editOptionModal.html',
				      controller: 'editOptionModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  option: function () {
				    		  return optionToEdit;
				    	  },
						  question: function(){
				    		  return angular.copy($scope.question);
					      }
				      }
			    });
			    
			    modalInstance.result.then(function (response) {
			    	$scope.question = editOptionService.updateQuestionWithNewOption($scope.question, response.newOption);
			    	if(response.isShowOrderChanged == true){
			    		editOptionService.updateOptionShowOrderChange(optionToEdit.showOrder, response.newOption.showOrder, $scope.question);
			    		//update the visibility of up and down arrow
						updateVisibilityOfUpAndDownArrow(optionToEdit);
			    	}
			    	if(response.isJumpQstNumChanged == true){
			    		$scope.updateFlowchart();
			    	}
			    	}, function () {
		        });
			};
			
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
			
			$scope.openDeleteModal = function (name) {
			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/deleteConfirmModal.html',
				      controller: 'deleteConfirmModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  item: function () {
				    		  if(name == 'option'){
					    		  return optionToEdit;
				    		  }else if(name == 'question'){
				    			  return $scope.question;
				    		  }
				    			  
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (item) {
			    	if(name == 'option'){
			    		editOptionService.deleteOption($scope.question, item);
			    		$scope.showAnswer = null;
			    		if(item.jumpTrg == true){
				    		$scope.updateFlowchart();
			    		}
			    	}else if(name == 'question'){
		    			$scope.deleteQuestion({chosenDeleteQuestion: item});
			    	}
			    	
			    	}, function () {
		        });
			};
			
			$scope.openAddOptionModal = function () {
			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/addOptionModal.html',
				      controller: 'addOptionModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  question: function () {
				    		  return angular.copy($scope.question);
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (response) {
			    	$scope.question.editOptionModels = response.existingOptions;
			    	if(response.jumpTrg == true){
			    		$scope.updateFlowchart();
			    	}
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
			
			
			function updateVisibilityOfUpAndDownArrow(optionToEdit){
				//update the visibility of up and down arrow
				if(optionToEdit.showOrder == 0){
					$scope.orderUp = false;
				}else{
					$scope.orderUp = true;
				}
				
				if(optionToEdit.showOrder == ($scope.question.editOptionModels.length - 1)){
					$scope.orderDown = false;
				}else{
					$scope.orderDown = true;
				}
			}
		}
	}
	
});