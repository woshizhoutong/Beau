editorApp.directive('checkboxQuestion', function(editOptionService, editQuestionService){
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
		templateUrl: '../resources/ng/itvEditor/directives/checkboxQuestion.html',
		controller: function($scope, $element, $modal){
			//Read the saved data into the form
			$scope.$watch("directiveAnswer", function() {
				var highlightOption = $scope.directiveAnswer;
				var highlightOptionObj = {};
				for(var i=0; i<highlightOption.length; i++){
					highlightOptionObj[highlightOption[i]] = true;
				}
				$scope.showAnswer = highlightOptionObj;
			});
			
			///// for editing options////
			var allOptions = $scope.question.editOptionModels;
			$scope.editOptionVisible = {};
			$scope.orderUp = {};
			$scope.orderDown = {};
			for(var i=0; i < allOptions.length; i++){
				//set all edit option icon to invisible
				$scope.editOptionVisible[allOptions[i].optNum] = false;
				// if the option is the first one then if orderUp is invisible
				if(allOptions[i].showOrder == 0){
					$scope.orderUp[allOptions[i].optNum] = false;
				}else{
					$scope.orderUp[allOptions[i].optNum] = true;
				}
				// if the option is the last one then if orderDown is invisible
				if(allOptions[i].showOrder == (allOptions.length - 1)){
					$scope.orderDown[allOptions[i].optNum] = false;
				}else{
					$scope.orderDown[allOptions[i].optNum] = true;
				}
			}
			
			// set edit icon to visible when mouse enters
			$scope.showEdit = function(optNum){
				$scope.editOptionVisible[optNum] = true;
			};
			// set edit icon to invisible when mouse leaves
			$scope.hideEdit = function(optNum){
				$scope.editOptionVisible[optNum] = false;
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
			
			$scope.moveOptionShowOrderUp = function(option){
				var oldOrder = option.showOrder;
				var newOrder = oldOrder - 1;
				option.showOrder = newOrder;
				editOptionService.updateOptionShowOrderChange(oldOrder, newOrder, $scope.question);
				
				//update the visibility of up and down arrow
				updateVisibilityOfUpAndDownArrow();
			}
			
			$scope.moveOptionShowOrderDown = function(option){
				var oldOrder = option.showOrder;
				var newOrder = oldOrder + 1;
				option.showOrder = newOrder;
				editOptionService.updateOptionShowOrderChange(oldOrder, newOrder, $scope.question);
				
				//update the visibility of up and down arrow
				updateVisibilityOfUpAndDownArrow();
			}
			
			/////////  Modals  //////////
			$scope.openEditOptionModal = function (option) {

			    var modalInstance = $modal.open({
				      animation: true,
				      templateUrl: '../resources/ng/itvEditor/directives/editOptionModal.html',
				      controller: 'editOptionModal',
				      size: 'md',
				      backdrop: 'static',
				      resolve: {
				    	  option: function () {
				    		  return angular.copy(option);
				    	  },
				    	  question: function(){
				    		  return angular.copy($scope.question);
				    	  }
				      }
			    });
			
			    modalInstance.result.then(function (response) {
			    	$scope.question = editOptionService.updateQuestionWithNewOption($scope.question, response.newOption);
			    	if(response.isShowOrderChanged == true){
			    		editOptionService.updateOptionShowOrderChange(option.showOrder, response.newOption.showOrder, $scope.question);
			    		//update the visibility of up and down arrow
			    		updateVisibilityOfUpAndDownArrow();
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
			
			$scope.openDeleteModal = function (item, name) {
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
			    	if(name == 'option'){
			    		editOptionService.deleteOption($scope.question, item);
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
			
			function updateVisibilityOfUpAndDownArrow(){
				var allOptions = $scope.question.editOptionModels;
				for(var i=0; i < allOptions.length; i++){
					// if the option is the first one then if orderUp is invisible
					if(allOptions[i].showOrder == 0){
						$scope.orderUp[allOptions[i].optNum] = false;
					}else{
						$scope.orderUp[allOptions[i].optNum] = true;
					}
					// if the option is the last one then if orderDown is invisible
					if(allOptions[i].showOrder == (allOptions.length - 1)){
						$scope.orderDown[allOptions[i].optNum] = false;
					}else{
						$scope.orderDown[allOptions[i].optNum] = true;
					}
				}
			}
		}
	}
	
});