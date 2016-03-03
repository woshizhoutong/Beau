app.controller('editCdpComCtl', function ($scope, $uibModal, $uibModalInstance, cdpUsrMngtSvc, comId) {
	if (comId == '') {
		cdpUsrMngtSvc.generateEmptyCompany().then(function(response) {
			$scope.cModel = response.data;
		});
	} else {
		cdpUsrMngtSvc.findCompany(comId).then(function(response) {
			$scope.cModel = response.data;
			$scope.initialLatestMetadataModels = angular.copy($scope.cModel.latestMetadataModels);
		});
	}
	
	$scope.addMetadata = function () {
        $scope.cModel.latestMetadataModels.push({
        	fileName: '',
    		description: '',
    		metadataFields: []
    	});
    };
    
    $scope.deleteMetadata = function (mIndex) {
        var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to delete this metadata?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				$scope.cModel.latestMetadataModels.splice(mIndex, 1);
			}
		});
    }
	
    $scope.addField = function (mIndex) {
        $scope.cModel.latestMetadataModels[mIndex].metadataFields.push({
    		name: '',
    		label: '',
    		format: '',
    		description: ''
    	});
    };
    
    $scope.deleteField = function (mIndex, fIndex) {
        var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to delete this field?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				$scope.cModel.latestMetadataModels[mIndex].metadataFields.splice(fIndex, 1);
			}
		});
    }
	
	$scope.saveDraft = function () {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Saving draft means you are still in company creation process, and you can make any change to the company\'s metadata during this process, you have to finalize the company creation process in order to meke this company enabled and accessible to users. Are you sure you want to save the draft?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				cdpUsrMngtSvc.saveCompanyDraft($scope.cModel).then(function(response) {
					if (response.status == 'SUCCESS') {
						$uibModalInstance.close(response.data);
					} else {
						alert("Sorry, server is temporarily unavailable, please try later!");
					}
				});
			}
		});
	};
	
	$scope.finalizeCreation = function () {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Once company creation is finalized, any change to the company\'s metadata will cause a new version of metadata to be generated. Are you sure you want to finalize company creation?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				cdpUsrMngtSvc.finalizeCompanyCreation($scope.cModel).then(function(response) {
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
					if (!angular.equals($scope.cModel.latestMetadataModels, $scope.initialLatestMetadataModels)) {
						return 'Metadata of this company has been changed, saving change will cause a new version of metadata to be generated. Are you sure you want to update company?';
					}
					return 'Are you sure you want to update company?';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				if (!angular.equals($scope.cModel.latestMetadataModels, $scope.initialLatestMetadataModels)) {
					$scope.cModel.metadataChanged = true;
				}
				cdpUsrMngtSvc.updateCompany($scope.cModel).then(function(response) {
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