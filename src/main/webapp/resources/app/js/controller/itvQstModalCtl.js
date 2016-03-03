app.controller('itvQstModalCtl', function ($scope, $modal, $modalInstance, itvSvc, itv, $log) {
	$scope.versionNum = itv.questionnaireVersionNum;
	$scope.reportId = itv.rptId;
	
	
	$scope.fnlItv = function() {
		var confirmModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to finalize interview for Report ' + itv.confirmationId;
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				itvSvc.finishInterview(itv.itvId, 'FINISHED_SUCCESS').then(function(response) {
					if (response.status == 'SUCCESS') {
						$modalInstance.close('FINISHED_SUCCESS');
					}
				});
			}
		});
	};
	
	$scope.stpItv = function () {
		var confirmModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to stop interview for Report ' + itv.confirmationId;
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				$modalInstance.close('FINISHED_PARTIALLY');
				itvSvc.finishInterview(itv.itvId, 'FINISHED_PARTIALLY').then(function(response) {
					if (response.status == 'SUCCESS') {
						$modalInstance.close('FINISHED_PARTIALLY');
					}
				});
			}
		});
	};
});