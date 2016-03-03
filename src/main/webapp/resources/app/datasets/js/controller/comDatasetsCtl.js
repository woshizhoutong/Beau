app.controller('comDatasetsCtl', function ($scope, $routeParams, currUsrSvc, datasetsSvc, sltValSvc, $uibModal, $log) {
	currUsrSvc.getCurrentUserAuthorities().then(function(response) {
		if (response.data.indexOf("UPDATE_DATASET") > -1) {
			$scope.hasUpdateAuth = true;
		} else {
			$scope.hasUpdateAuth = false;
		}
		if (response.data.indexOf("DELETE_DATASET") > -1) {
			$scope.hasDeleteAuth = true;
		} else {
			$scope.hasDeleteAuth = false;
		}
	});
	
	loadDatasets();
	
	 $scope.download = function(datasetId) {
         $scope.$emit('download-start');
         datasetsSvc.download(datasetId).then(function() {
        	 loadDatasets();
    	 });
     };
	
	$scope.remove = function(dataset) {
		var confirmModal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmDangerModal.html',
			controller: 'confirmDangerModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Deleting is actually deleting the record in database, are you sure you want to delete';
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				datasetsSvc.remove(dataset).then(function() {
					loadDatasets();
				});
			}
		});
	};
	
	function loadDatasets() {
		datasetsSvc.getNewUploadedByCompanyId($routeParams.comId).then(function(response) {
			$scope.newUploaded = response.data;
		});
		
		datasetsSvc.getDownloadedByCompanyId($routeParams.comId).then(function(response) {
			$scope.datasets = response.data;
		});
	}
});