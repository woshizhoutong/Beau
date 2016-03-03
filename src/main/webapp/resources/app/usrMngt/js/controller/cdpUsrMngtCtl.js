app.controller('cdpUsrMngtCtl', function ($scope, currUsrSvc, cdpUsrMngtSvc, sltValSvc, $uibModal, $log) {
	currUsrSvc.getCurrentUserAuthorities().then(function(response) {
		if (response.data.indexOf("UPDATE_USER_MANAGEMENT") > -1) {
			$scope.hasUpdateAuth = true;
		} else {
			$scope.hasUpdateAuth = false;
		}
	});
	
	loadUsers();
	loadCompanies();
	
	$scope.viewRequest = function(user) {
		var viewCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/viewCdpUsrRqtModal.html',
			controller: 'viewCdpUsrRqtCtl',
			size: 'md',
			resolve: {
				uModel: function() {
					return angular.copy(user);
				},
			}
		});
		
		viewCdpUsrModal.result.then(function () {
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.process = function(user) {
		var processCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/processCdpUsrRqtModal.html',
			controller: 'processCdpUsrRqtCtl',
			size: 'md',
			resolve: {
				uModel: function() {
					return angular.copy(user);
				},
			}
		});
		
		processCdpUsrModal.result.then(function () {
			loadUsers();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.view = function(user) {
		var viewCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/viewCdpUsrModal.html',
			controller: 'viewCdpUsrCtl',
			size: 'md',
			resolve: {
				uModel: function() {
					return angular.copy(user);
				},
			}
		});
		
		viewCdpUsrModal.result.then(function () {
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.edit = function(user) {
		var editCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/editCdpUsrModal.html',
			controller: 'editCdpUsrCtl',
			size: 'md',
			resolve: {
				uModel: function() {
					return angular.copy(user);
				},
			}
		});
		
		editCdpUsrModal.result.then(function () {
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
					return 'Delete is for test purpose only, because it is actually deleting the user record, so if the user has any record in the database, deleting the user will cause problem. Make sure that the user has no data. Are you sure you want to delete this user?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				cdpUsrMngtSvc.removeUser(user).then(function() {
					loadUsers();
				});
			}
		});
	};
	
	$scope.editCompany = function(company) {
		var editCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/editCdpComModal.html',
			controller: 'editCdpComCtl',
			size: 'lg',
			resolve: {
				comId: function() {
					return company.id;
				},
			}
		});
		
		editCdpUsrModal.result.then(function () {
			loadCompanies();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.viewCompany = function(company) {
		var editCdpComModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/viewCdpComModal.html',
			controller: 'viewCdpComCtl',
			size: 'lg',
			resolve: {
				comId: function() {
					return company.id;
				},
			}
		});
		
		editCdpComModal.result.then(function () {
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.removeCompany = function(comId) {
		comDelModel = {
				id: comId,
				deleteChildrenRecord: false,
		}
		var confirmDelModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmDangerModal.html',
			controller: 'confirmDangerModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Delete is for test purpose only, because it is actually deleting the company record, so if the company has any record in the database, deleting the company will cause problem. Make sure that the company has no data. Are you sure you want to delete this company?';
				}
			}
		});
		
		confirmDelModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				cdpUsrMngtSvc.removeCompany(comDelModel).then(function(response) {
					if (response.status == 'SUCCESS') {
						loadCompanies();
					} else {
						if (response.message == 'HAS_CHILDREN') {
							var errors = response.data;
							var fnOpenModal = function(i) {
								if (i >= errors.length) {
									comDelModel.deleteChildrenRecord = true;
									cdpUsrMngtSvc.removeCompany(comDelModel).then(function(response) {
										if (response.status == 'SUCCESS') {
											loadCompanies();
										}
									});
									return;
								}
								var error = errors[i];
								var openModal = $uibModal.open({
									animation: true,
									backdrop: 'static',
									templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmDangerModal.html',
									controller: 'confirmDangerModalCtl',
									size: 'md',
									resolve: {
										msg: function() {
											if (error == 'HAS_USERS') {
												return 'You have to delete all users of the company as well, do you want to delete them?';
											} else if (error == 'HAS_METADATAS') {
												return 'You have to delete all metadatas of the company as well, do you want to delete them?';
											}
										}
									}
								});
								
								openModal.result.then(function (status) {
									if(status == 'CONFIRM') {
										fnOpenModal(i + 1);
									}
								});
							}
							fnOpenModal(0);
						}
					}
					
				});
			}
		});
	};
	
	$scope.addCompany = function() {
		var editCdpUsrModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/editCdpComModal.html',
			controller: 'editCdpComCtl',
			size: 'lg',
			resolve: {
				comId: function() {
					return '';
				},
			}
		});
		
		editCdpUsrModal.result.then(function () {
			loadCompanies();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	function loadUsers() {
		cdpUsrMngtSvc.listRequests().then(function(response) {
			$scope.newRequests = response.data;
		});
		
		cdpUsrMngtSvc.listExisting().then(function(response) {
			$scope.existingUsers = response.data;
		});
	};
	
	function loadCompanies() {
		cdpUsrMngtSvc.listCompanies().then(function(response) {
			$scope.companies = response.data;
		});
	}
});