editorApp.controller('addOptionModal', function ($scope, $modalInstance, $filter, editOptionService, question) {
	
	$scope.addOption = function () {
		if($scope.newOption.jumpQstNum == null){
			$scope.newOption.jumpTrg = false;
			$scope.showDestinationDropdown = false;
			$scope.newOption.fromPort = null;
			$scope.newOption.toPort = null;
			$scope.newOption.primaryLink = false;
		}
		$scope.newOption.optNum = editOptionService.getTotalNumOfOptions() + 1;
		$scope.newOption.showOrder = existingOptions.length;
		existingOptions.push($scope.newOption);
		$modalInstance.close(
				{"existingOptions": existingOptions,
				 "jumpTrg": $scope.newOption.jumpTrg
				}
		);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	var existingOptions = question.editOptionModels;
	//initialize the new option
	$scope.newOption = {};
	$scope.newOption.optId = null;
	$scope.newOption.optNum = null;
	$scope.newOption.optTitle = null;
	$scope.newOption.optInstruction = null;
	$scope.newOption.showOrder = existingOptions.length;
	$scope.newOption.qstNum = question.qstNum;
	if(question.childQuestion == true){
		$scope.newOption.parentQstNum = question.parentQstNum;
	}else{
		$scope.newOption.parentQstNum = question.qstNum;
	}
	$scope.newOption.qstId = null;
	$scope.newOption.jumpQstNum = null;
	$scope.newOption.jumpTrg = false;
	$scope.newOption.fromPort = null;
	$scope.newOption.toPort = null;
	$scope.newOption.primaryLink = false;
	$scope.newOption.hideObj = null;
	$scope.newOption.hideTrg = false;
	
	// get the dropdown list for jumpdestination
	$scope.allQstNumList = editOptionService.getJumpDestinationQstNumList($scope.newOption.parentQstNum);
	// get the dropdown list for showOrder List
//	$scope.showOrderList = editOptionService.getShowOrderList(question);
//	console.log($scope.showOrderList);
	
	$scope.showDestinationDropdown = false;
	$scope.$watch("newOption.jumpTrg", function() {
		if($scope.newOption.jumpTrg == true){
			$scope.showDestinationDropdown = true;
		}else{
			$scope.showDestinationDropdown = false;
			$scope.newOption.jumpQstNum = null
		}
	}); 
	
	$scope.changeDestination = function() {
		
		if(eval($scope.newOption.jumpQstNum > $scope.newOption.parentQstNum)){
			$scope.newOption.fromPort = 'R';
			$scope.newOption.toPort = 'R';
			$scope.newOption.primaryLink = false;
			$scope.newOption.points = null;
		}else if (eval($scope.newOption.jumpQstNum < $scope.newOption.parentQstNum)){
			$scope.newOption.fromPort = 'L';
			$scope.newOption.toPort = 'L';
			$scope.newOption.primaryLink = false;
			$scope.newOption.points = null;
		}
		
	};
})

