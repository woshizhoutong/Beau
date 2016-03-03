editorApp.controller('editorController', 
		['$scope', '$location', 'questionEditorService', 'editOptionService',
		 'editQuestionService', '$routeParams', '$location', '$modal',
		 function ($scope, $location, questionEditorService, editOptionService,
				 editQuestionService, $routeParams, $location, $modal) {
	
	$scope.model = go.Model.fromJson({});
	$scope.model.selectedNodeData = null;
	$scope.allQuestionData = [];
	$scope.justAfterUpdateFlowchart = false;
	
	questionEditorService.getAllQuestionData().then(function(response){
		$scope.allQuestionData = angular.copy(response);
		editOptionService.setAllQuestionData($scope.allQuestionData);//update jumpDestination dropdown list in the modal
		editQuestionService.setAllQuestionData($scope.allQuestionData);//update sequence dropdown list in the modal
		$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
		$scope.model = go.Model.fromJson($scope.flowchartData);
	});		
	
	$scope.updateFlowchart = function(){
		$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
		$scope.model = go.Model.fromJson($scope.flowchartData);
		$scope.justAfterUpdateFlowchart = true;
	};
	 
	$scope.updateQuestionSequence = function(qstDataForUpdate){
		questionEditorService.updateAllQuestionDataWithSequenceChange($scope.allQuestionData, qstDataForUpdate.newQuestion, qstDataForUpdate.oldQstNum);
		$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
		$scope.model = go.Model.fromJson($scope.flowchartData);
		$scope.justAfterUpdateFlowchart = true;
		//newQuestion is a copy of $scope.question, so update it here.
		$scope.question = qstDataForUpdate.newQuestion;
	};
	
	$scope.deleteQuestion = function(chosenDeleteQuestion){
		questionEditorService.deleteParentQuestionWithAllQuestionData($scope.allQuestionData, chosenDeleteQuestion);
		editOptionService.setAllQuestionData($scope.allQuestionData); //update jumpDestination dropdown list in the modal
		$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
		$scope.model = go.Model.fromJson($scope.flowchartData);
		$scope.justAfterUpdateFlowchart = true;
		$scope.question = null;
	};

	$scope.highlightOptNum = null;
	$scope.highlightAnswer = [];
	
	$scope.$watch("model.selectedNodeData", function(newData) {

		if((newData != null) && !(typeof newData === undefined)){
			$scope.question = questionEditorService.getParentQuestionByQstNumWithAllQuestionData($scope.allQuestionData, newData.key);
			$scope.highlightOptNum = null;
			$scope.highlightAnswer = [];
			$scope.justAfterUpdateFlowchart = false;
		}
		
		if(($scope.model.selectedNodeData == null) && ($scope.model.selectedLinkData == null)){
			if($scope.justAfterUpdateFlowchart == false){
				$scope.question = null;
			}
			$scope.highlightOptNum = null;
			$scope.highlightAnswer = [];
		}
		
	});
	
	$scope.$watch("model.selectedLinkData", function(newData) {
		if((newData != null) && !(typeof newData === undefined)){
			$scope.question = questionEditorService.getParentQuestionByQstNumWithAllQuestionData($scope.allQuestionData, newData.from);
			if(newData.primaryLink == false){
				$scope.highlightOptNum = newData.optNum;
				$scope.highlightAnswer = [newData.optNum];
			}else{
				$scope.highlightOptNum = null;
				$scope.highlightAnswer = [];
			}
			$scope.justAfterUpdateFlowchart = false;
		}
		if(($scope.model.selectedNodeData == null) && ($scope.model.selectedLinkData == null)){
			if($scope.justAfterUpdateFlowchart == false){
				$scope.question = null;
			}
			$scope.highlightOptNum = null;
			$scope.highlightAnswer = [];
		}
	});
	
	//watch location and points change in flowchart
//	$scope.$watch("model.selectedNodeData.loc", function(newLoc) {
//		if(($scope.model.selectedNodeData != null) && !(typeof $scope.model.selectedNodeData === undefined)){
//			$scope.question.loc = newLoc;
//			
//			var json = $scope.model.toJson();
//			var obj = JSON.parse(json);
//			// also change all the link points, since it changes with node location sometimes.
//			var linkDataArray = obj.linkDataArray;
//			for(var i=0; i<linkDataArray.length; i++){
//				var linkData = linkDataArray[i];
//				if(linkData.optNum != null){
//					for(var j=0; j<$scope.allQuestionData.length; j++){
//						var option = questionEditorService.getOptionByOptNumWithParentQuestion($scope.allQuestionData[j], linkData.optNum);
//						if((option != null) && !(typeof option === undefined)){
//							option.points = linkData.points;
//						}
//					}
//				}
//			}
//		}
//	});
	
	//test watch all nodes
	$scope.$watch("model.nodeDataArray", function(newValue, oldValue) {
		if(newValue.length > 0 && oldValue.length > 0){
			for(var i=0; i<$scope.allQuestionData.length; i++){
				$scope.allQuestionData[i].loc = newValue[i].loc;
			}
			
			var json = $scope.model.toJson();
			var obj = JSON.parse(json);
			// also change all the link points, since it changes with node location sometimes.
			var linkDataArray = obj.linkDataArray;
			for(var i=0; i<linkDataArray.length; i++){
				var linkData = linkDataArray[i];
				if(linkData.optNum != null){
					for(var j=0; j<$scope.allQuestionData.length; j++){
						var option = questionEditorService.getOptionByOptNumWithParentQuestion($scope.allQuestionData[j], linkData.optNum);
						if((option != null) && !(typeof option === undefined)){
							option.points = linkData.points;
						}
					}
				}
			}
		}
	}, true);
	
	
	$scope.$watch("model.selectedLinkData.points", function() {
		if(($scope.model.selectedLinkData != null) && !(typeof $scope.model.selectedLinkData === undefined)){
			var option = questionEditorService.getOptionByOptNumWithParentQuestion($scope.question, $scope.model.selectedLinkData.optNum);
			 
			/*use toJson() method of gojs to conver the complicated "model" object to simple json which is
			 compatible with the backend and then convert it back to Javascript object, so that
			 we can retrieve the  linkDataArray.*/
			
			var json = $scope.model.toJson();
			var obj = JSON.parse(json);
	
			var linkDataArray = obj.linkDataArray;
			var linkData = questionEditorService.getLinkByOptNumWithLinkDataArray(linkDataArray, option.optNum);
			
			option.points = linkData.points;
		}
	});
	
	/////// buttons on the top ///////
	
	$scope.save = function(){
		questionEditorService.saveAllQuestionDataToServer($scope.allQuestionData);
	};
	
	$scope.finalize = function(){
		questionEditorService.finilizaAllQuestionDataToServer($scope.allQuestionData);
	};
	
	$scope.openAddQuestionModal = function () {

	    var modalInstance = $modal.open({
		      animation: true,
		      templateUrl: '../resources/ng/itvEditor/directives/addQuestionModal.html',
		      controller: 'addQuestionModal',
		      size: 'md',
		      backdrop: 'static',
		      resolve: {
		      }
	    });
	
	    modalInstance.result.then(function (response) {
	    	questionEditorService.addQuestionToAllQuestionDataWithSequenceChange(
	    			$scope.allQuestionData, response.newQuestion, response.isSequenceChnaged);
			editOptionService.setAllQuestionData($scope.allQuestionData);//update jumpDestination dropdown list in the modal
			editQuestionService.setAllQuestionData($scope.allQuestionData);//update sequence dropdown list in the modal
			questionEditorService.setAllQuestionData($scope.allQuestionData);//update insert to dropdown list in the modal of creating new question
	    	$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
			$scope.model = go.Model.fromJson($scope.flowchartData);
	    	}, function () {
        });
	};
	
	$scope.resetFlowchart = function(){
		questionEditorService.resetFlowchart($scope.allQuestionData);
		$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
		$scope.model = go.Model.fromJson($scope.flowchartData);
	};
	
	$scope.openExistingQuestions = function () {

	    var modalInstance = $modal.open({
		      animation: true,
		      templateUrl: '../resources/ng/itvEditor/directives/openExistingQuestionsModal.html',
		      controller: 'openExistingQuestionsModal',
		      size: 'md',
		      backdrop: 'static',
		      resolve: {
		      }
	    });
	
	    modalInstance.result.then(function (response) {
	    	if(response != null){
	    		$scope.allQuestionData = angular.copy(response);
	    		editOptionService.setAllQuestionData($scope.allQuestionData);//update jumpDestination dropdown list in the modal
				editQuestionService.setAllQuestionData($scope.allQuestionData);//update sequence dropdown list in the modal
				questionEditorService.setAllQuestionData($scope.allQuestionData);//update insert to dropdown list in the modal of creating new question
		    	$scope.flowchartData = questionEditorService.getFlowChartDataWithAllQuestionData($scope.allQuestionData);
				$scope.model = go.Model.fromJson($scope.flowchartData);
	    	}
	    	}, function () {
        });
	};
}]);