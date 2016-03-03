app.controller('itvsCtl', function ($scope, $routeParams, $modal, itvSvc) {
	itvSvc.getItvsByRptId($routeParams.rptId).then(function(response) {
		$scope.rpt = response.data.rpt;
		$scope.activeItvs = response.data.itvs.activeItvs;
		$scope.historicalItvs = response.data.itvs.historicalItvs;
	});
	
	$scope.startInterview = function (itv) {
		var itvStartItvModal = openItvStartItvModal(itv);
		itvStartItvModal.result.then(function (itv) {
			var itvRvwRptModal = openItvRvwRptModal(itv);
			itvRvwRptModal.result.then(function() {
				var itvQstModal = openItvQstModal(itv);
				itvQstModal.result.then(function(rptItvStatus) {
					$scope.reportInterviewStatus = rptItvStatus;
				});
			});
		});
	};
	
	$scope.$watch('reportInterviewStatus', function(newVal) {
		if (newVal != undefined ) {
			itvSvc.getItvsByRptId($routeParams.rptId).then(function(response) {
				$scope.rpt = response.data.rpt;
				$scope.activeItvs = response.data.itvs.activeItvs;
				$scope.historicalItvs = response.data.itvs.historicalItvs;
			});
		}
	});
	
//	define modals
	var openItvStartItvModal = function(itv) {
		return $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/itvStartItvModal.html',
			controller: 'itvStartItvModalCtl',
			size: 'md',
			resolve: {
				itv: function() {
					return itv;
				}
			}
		});
	};
	
	var openItvRvwRptModal = function(itv) {
		return $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/itvRvwRptModal.html',
			controller: 'itvRvwRptModalCtl',
			size: 'lg',
			resolve: {
				itv: function() {
					return itv;
				}
			}
		});
	};
	
	var openItvQstModal = function(itv) {
		return $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/itvQstModal.html',
			controller: 'itvQstModalCtl',
			size: 'lg',
			resolve: {
				itv: function() {
					return itv;
				}
			}
		});
	};
	
});