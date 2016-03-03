editorApp.controller('editOptionModal', function ($scope, $modalInstance, $filter, editOptionService, option, question) {
	
	$scope.updateOption = function () {
		if($scope.newOption.jumpQstNum == null){
			$scope.newOption.jumpTrg = false;
			$scope.showDestinationDropdown = false;
			$scope.newOption.fromPort = null;
			$scope.newOption.toPort = null;
			$scope.newOption.primaryLink = false;
		}

		var isShowOrderChanged = false;
		if($scope.newOption.showOrder != option.showOrder){
			isShowOrderChanged = true;
		}
		
		var isJumpQstNumChanged = false;
		if($scope.newOption.jumpQstNum != option.jumpQstNum){
			isJumpQstNumChanged = true;
		}
		
		$modalInstance.close(
			{
				"newOption": $scope.newOption,
				"isJumpQstNumChanged": isJumpQstNumChanged,
				"isShowOrderChanged": isShowOrderChanged
			}
		);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	$scope.newOption = angular.copy(option);
	
	// get the dropdown list for jumpdestination
	$scope.allQstNumList = editOptionService.getJumpDestinationQstNumList($scope.newOption.parentQstNum);
	// get the dropdown list for showOrder List
	$scope.showOrderList = editOptionService.getShowOrderList(question);
	console.log($scope.showOrderList);
	
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

