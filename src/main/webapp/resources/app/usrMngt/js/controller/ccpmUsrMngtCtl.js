app.controller('ccpmUsrMngtCtl', function ($scope, currUsrSvc, ccpmUsrMngtSvc, sltValSvc, $uibModal, $log) {
	currUsrSvc.getCurrentUserAuthorities().then(function(response) {
		if (response.data.indexOf("UPDATE_USER_MANAGEMENT") > -1) {
			$scope.hasUpdateAuth = true;
		} else {
			$scope.hasUpdateAuth = false;
		}
	});
	
	loadUsers();
	
	$scope.add = function() {
		var editCcpmUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/editCcpmUsrModal.html',
			controller: 'editCcpmUsrCtl',
			size: 'md',
			resolve: {
				uId: function() {
					return '';
				},
			}
		});
		
		editCcpmUsrModal.result.then(function () {
			loadUsers();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.view = function(user) {
		var viewCcpmUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/viewCcpmUsrModal.html',
			controller: 'viewCcpmUsrCtl',
			size: 'md',
			resolve: {
				uId: function() {
					return angular.copy(user.id);
				},
			}
		});
		
		viewCcpmUsrModal.result.then(function () {
			
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.edit = function(user) {
		var editCcpmUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/editCcpmUsrModal.html',
			controller: 'editCcpmUsrCtl',
			size: 'md',
			resolve: {
				uId: function() {
					return angular.copy(user.id);
				},
			}
		});
		
		editCcpmUsrModal.result.then(function () {
			loadUsers();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.remove = function(user) {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Delete is for test purpose only, because it is actually deleting the user record, so if the user has any record in the database, deleting the user will cause problem. Make sure that the user has no data. Are you sure you want to delete this new user?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				ccpmUsrMngtSvc.removeUser(user).then(function() {
					loadUsers();
				});
			}
		});
	};
	
	function loadUsers() {
		ccpmUsrMngtSvc.listExisting().then(function(response) {
			$scope.existingUsers = response.data;
		});
	};
});