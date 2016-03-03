chartApp.controller('editOptionModal', function ($scope, $modalInstance, $filter, editOptionModalService, option) {
	
	$scope.updateOption = function () {
		if($scope.newOption.jumpDestination == null){
			$scope.newOption.jumpTrg = false;
			$scope.showDestinationDropdown = false;
			$scope.newOption.fromPort = null;
			$scope.newOption.toPort = null;
			$scope.newOption.primaryLink = false;
		}
		$modalInstance.close($scope.newOption);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	$scope.newOption = angular.copy(option);
	$scope.chosenJumpDestination = {};
	
	// consider to put this part into service
	// consider to put this part into service
	var allQstNumList = editOptionModalService.getAllQuestionNumList();
	var allQstNumListToShow = allQstNumList;
	for(var i=0; i<allQstNumListToShow.length; i++){
		if(allQstNumListToShow[i].qstId == $scope.newOption.qstId){
			allQstNumListToShow.splice(i, 1);
			break;
		}
	}
	$scope.allQstNumList = allQstNumListToShow;
	//get the saved chosen jump destination, it must be an object that is the same as in 'ngoption'
	for(var i=0; i<allQstNumList.length; i++){
		if(allQstNumList[i].qstId == option.jumpDestination){
			$scope.chosenJumpDestination = allQstNumList[i];
			break;
		}
	}
	// consider to put this part into service
	// consider to put this part into service
	
	$scope.showDestinationDropdown = false;
	$scope.$watch("newOption.jumpTrg", function() {
		if($scope.newOption.jumpTrg == true){
			$scope.showDestinationDropdown = true;
		}else{
			$scope.showDestinationDropdown = false;
		}
	});
	
	$scope.changeDestination = function() {
		
		var jumpDestinationQstNum = $filter('filter')($scope.allQstNumList, {qstId:$scope.chosenJumpDestination.qstId})[0].qstNum;
		if(jumpDestinationQstNum > $scope.newOption.qstNum){
			$scope.newOption.fromPort = 'R';
			$scope.newOption.toPort = 'R';
			$scope.newOption.primaryLink = false;
			$scope.newOption.jumpDestination = $scope.chosenJumpDestination.qstId;
		}else if (jumpDestinationQstNum < $scope.newOption.qstNum){
			$scope.newOption.fromPort = 'L';
			$scope.newOption.toPort = 'L';
			$scope.newOption.primaryLink = false;
			$scope.newOption.jumpDestination = $scope.chosenJumpDestination.qstId;
		}
	};

})

