app.controller('editCcpmUsrCtl', function ($scope, $uibModal, $uibModalInstance, ccpmUsrMngtSvc, sltValSvc, uId) {
	sltValSvc.getAllRoleTypes().then(function(items) {
		$scope.roleTypes = items;
		if (uId == '') {
			ccpmUsrMngtSvc.generateEmptyUser().then(function(response) {
				$scope.uModel = response.data;
			});
		} else {
			ccpmUsrMngtSvc.findUser(uId).then(function(response) {
				$scope.uModel = response.data;
				angular.forEach($scope.roleTypes, function(item, key) {
					if ($scope.uModel.roleType.value === item.value) 
						$scope.uModel.roleType = item;
				});
			});
		}
	});
	
	
	$scope.add = function () {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to add this new user?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				ccpmUsrMngtSvc.addUser($scope.uModel).then(function(response) {
					if (response.status == 'SUCCESS') {
						$uibModalInstance.close(response.data);
					} else {
						alert("Sorry, server is temporarily unavailable, please try later!");
					}
				});
			}
		});
	};
	
	$scope.update = function () {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to update this user?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				ccpmUsrMngtSvc.updateUser($scope.uModel).then(function(response) {
					if (response.status == 'SUCCESS') {
						$uibModalInstance.close(response.data);
					} else {
						alert("Sorry, server is temporarily unavailable, please try later!");
					}
				});
			}
		});
	};
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});