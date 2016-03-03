app.controller('oriRptCtl', function ($scope, $rootScope, oriRptSvc, sltValSvc, $routeParams, $location, datepickerPopupConfig, $modal) {
	/* Along with the $scope.someOuterObject.someSelectItemList = {}; eg. $scope.oriRpt.bestTimeToCallTimezone = {};
	 * to make sure when ng-model and ng-options both get bound when select directive gets initialized.
	 * Otherwise, if you refresh the page many times, 
	 * you will find that it is possible the select does not get populated correctly.
	 * This explanation is just Xiaodong Yuan's personal option, NOT guaranteed to be right*/
	$scope.oriRpt = {};
	
	/*Start of initializing drop downs*/
	sltValSvc.getSelectionItemsByName('Timezone').then(function(items) {
		$scope.oriRpt.bestTimeToCallTimezone = {};
		$scope.timezones = items;
	});
	sltValSvc.getSelectionItemsByName('Operation').then(function(items) {
		$scope.oriRpt.operation = {};
		$scope.operations = items;
	});
	sltValSvc.getSelectionItemsByName('JobPosition').then(function(items) {
		$scope.oriRpt.jobPosition = {};
		$scope.jobPositions = items;
	});
	sltValSvc.getSelectionItemsByName('SourceOfEvent').then(function(items) {
		$scope.oriRpt.sourceOfEvent = {};
		$scope.sourceOfEvents = items;
	});
	sltValSvc.getSelectionItemsByName('RigType').then(function(items) {
		$scope.oriRpt.rigType = {};
		$scope.rigTypes = items;
	});
	sltValSvc.getSelectionItemsByName('RigComponent').then(function(items) {
		$scope.oriRpt.rigComponent = {};
		$scope.rigComponents = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformType').then(function(items) {
		$scope.oriRpt.platformType = {};
		$scope.platformTypes = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformTypeSub').then(function(items) {
		$scope.oriRpt.platformTypeSub = {};
		$scope.platformTypeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('LocationOnPlatform').then(function(items) {
		$scope.oriRpt.locationOnPlatform = {};
		$scope.locationOnPlatforms = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipeline').then(function(items) {
		$scope.oriRpt.materialInPipeline = {};
		$scope.materialInPipelines = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationMode').then(function(items) {
		$scope.oriRpt.transportationMode = {};
		$scope.transportationModes = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationModeSub').then(function(items) {
		$scope.oriRpt.transportationModeSub = {};
		$scope.transportationModeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('EventLocation').then(function(items) {
		$scope.oriRpt.eventLocation = {};
		$scope.eventLocations = items;
	});
	sltValSvc.getSelectionItemsByName('WorkActivity').then(function(items) {
		$scope.oriRpt.workActivity = {};
		$scope.workActivitys = items;
	});
	sltValSvc.getSelectionItemsByName('LiftingFromAndTo').then(function(items) {
		$scope.oriRpt.liftingFromAndTo = {};
		$scope.liftingFromAndTos = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipelineLH').then(function(items) {
		$scope.oriRpt.materialInPipelineLH = {};
		$scope.materialInPipelineLHs = items;
	});
	sltValSvc.getSelectionItemsByName('DeviceLocation').then(function(items) {
		$scope.oriRpt.deviceLocation = {};
		$scope.deviceLocations = items;
	});
	sltValSvc.getSelectionItemsByName('CommunicationMethod').then(function(items) {
		$scope.oriRpt.communicationMethod = {};
		$scope.communicationMethods = items;
	});
	sltValSvc.getSelectionItemsByName('CraneInstallation').then(function(items) {
		$scope.oriRpt.craneInstallation = {};
		$scope.craneInstallations = items;
	});
	sltValSvc.getSelectionItemsByName('CraneType').then(function(items) {
		$scope.oriRpt.craneType = {};
		$scope.craneTypes = items;
	});
	sltValSvc.getSelectionItemsByName('EquipmentType').then(function(items) {
		$scope.oriRpt.equipmentType = {};
		$scope.equipmentTypes = items;
	});
	sltValSvc.getSelectionItemsByName('LoadType').then(function(items) {
		$scope.oriRpt.loadType = {};
		$scope.loadTypes = items;
	});
	/*End of initializing drop downs*/
	
	/*Start of initializing datepickers*/
	/*Start of global setting for all datepickers*/
	$scope.dateOptions = {
		'starting-day': 0,
		'show-weeks': false			
	};
	datepickerPopupConfig.closeText = 'Close';
	/*End of global setting for all datepickers*/
	
	$scope.bdtcStartOpen = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.bdtcStartOpened = true;
	};
	
	$scope.bdtcEndOpen = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.bdtcEndOpened = true;
	};
	
	$scope.doeOpen = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.doeOpened = true;
	};
	
	$scope.lidOpen = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	    $scope.lidOpened = true;
	};
	
	/*Disable weekend selection for best date to call range*/
	$scope.bdtcDisabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};
	
	var today = new Date();
	$scope.doeMaxDate = today;
	$scope.lidMaxDate = today;
	/*End of initializing datepickers*/
	
	/*Initialize all fields*/
	oriRptSvc.getOriRptById($routeParams.oriRptId).then(function(response) {
		if (response.status == 'SUCCESS') {
			$scope.oriRpt = response.data;
			$scope.editable = false;
			
			/*Start of setting the selected values for all drop downs*/
			angular.forEach($scope.timezones, function(item, key) {
				if ($scope.oriRpt.bestTimeToCallTimezone.value === item.value) 
					$scope.oriRpt.bestTimeToCallTimezone = item;
			});
			angular.forEach($scope.operations, function(item, key) {
				if ($scope.oriRpt.operation.value === item.value) 
					$scope.oriRpt.operation = item;
			});
			angular.forEach($scope.jobPositions, function(item, key) {
				if ($scope.oriRpt.jobPosition.value === item.value) 
					$scope.oriRpt.jobPosition = item;
			});
			angular.forEach($scope.sourceOfEvents, function(item, key) {
				if ($scope.oriRpt.sourceOfEvent.value === item.value) 
					$scope.oriRpt.sourceOfEvent = item;
			});
			angular.forEach($scope.timezones, function(item, key) {
				if ($scope.oriRpt.timeOfEventTimezone.value === item.value) 
					$scope.oriRpt.timeOfEventTimezone = item;
			});
			angular.forEach($scope.operations, function(item, key) {
				if ($scope.oriRpt.happenedOperation.value === item.value) 
					$scope.oriRpt.happenedOperation = item;
			});
			angular.forEach($scope.rigTypes, function(item, key) {
				if ($scope.oriRpt.rigType.value === item.value) 
					$scope.oriRpt.rigType = item;
			});
			angular.forEach($scope.rigComponents, function(item, key) {
				if ($scope.oriRpt.rigComponent.value === item.value) 
					$scope.oriRpt.rigComponent = item;
			});
			angular.forEach($scope.platformTypes, function(item, key) {
				if ($scope.oriRpt.platformType.value === item.value) 
					$scope.oriRpt.platformType = item;
			});
			angular.forEach($scope.platformTypeSubs, function(item, key) {
				if ($scope.oriRpt.platformTypeSub.value === item.value) 
					$scope.oriRpt.platformTypeSub = item;
			});
			angular.forEach($scope.locationOnPlatforms, function(item, key) {
				if ($scope.oriRpt.locationOnPlatform.value === item.value) 
					$scope.oriRpt.locationOnPlatform = item;
			});
			angular.forEach($scope.materialInPipelines, function(item, key) {
				if ($scope.oriRpt.materialInPipeline.value === item.value) 
					$scope.oriRpt.materialInPipeline = item;
			});
			angular.forEach($scope.transportationModes, function(item, key) {
				if ($scope.oriRpt.transportationMode.value === item.value) 
					$scope.oriRpt.transportationMode = item;
			});
			angular.forEach($scope.transportationModeSubs, function(item, key) {
				if ($scope.oriRpt.transportationModeSub.value === item.value) 
					$scope.oriRpt.transportationModeSub = item;
			});
			angular.forEach($scope.eventLocations, function(item, key) {
				if ($scope.oriRpt.eventLocation.value === item.value) 
					$scope.oriRpt.eventLocation = item;
			});
			angular.forEach($scope.workActivitys, function(item, key) {
				if ($scope.oriRpt.workActivity.value === item.value) 
					$scope.oriRpt.workActivity = item;
			});
			angular.forEach($scope.liftingFromAndTos, function(item, key) {
				if ($scope.oriRpt.liftingFromAndTo.value === item.value) 
					$scope.oriRpt.liftingFromAndTo = item;
			});
			angular.forEach($scope.materialInPipelineLHs, function(item, key) {
				if ($scope.oriRpt.materialInPipelineLH.value === item.value) 
					$scope.oriRpt.materialInPipelineLH = item;
			});
			angular.forEach($scope.deviceLocations, function(item, key) {
				if ($scope.oriRpt.deviceLocation.value === item.value) 
					$scope.oriRpt.deviceLocation = item;
			});
			angular.forEach($scope.communicationMethods, function(item, key) {
				if ($scope.oriRpt.communicationMethod.value === item.value) 
					$scope.oriRpt.communicationMethod = item;
			});
			angular.forEach($scope.craneInstallations, function(item, key) {
				if ($scope.oriRpt.craneInstallation.value === item.value) 
					$scope.oriRpt.craneInstallation = item;
			});
			angular.forEach($scope.craneTypes, function(item, key) {
				if ($scope.oriRpt.craneType.value === item.value) 
					$scope.oriRpt.craneType = item;
			});
			angular.forEach($scope.equipmentTypes, function(item, key) {
				if ($scope.oriRpt.equipmentType.value === item.value) 
					$scope.oriRpt.equipmentType = item;
			});
			angular.forEach($scope.loadTypes, function(item, key) {
				if ($scope.oriRpt.loadType.value === item.value) 
					$scope.oriRpt.loadType = item;
			});
			/*End of setting the selected values for all drop downs*/
			
			/*Set the min and max for best date to call range, it has to be after setting the value of them, because they are related to their values*/
//			NOT WORKING
			var todayOfNextYear = new Date();
			todayOfNextYear.setDate(todayOfNextYear.getYear() + 1);
			$scope.bdtcStartMinDate = today;
			$scope.bdtcStartMaxDate = $scope.oriRpt.bestDateToCallEnd == null ? todayOfNextYear : $scope.oriRpt.bestDateToCallEnd;
			$scope.bdtcEndMinDate = ($scope.oriRpt.bestDateToCallStart == null ? today : $scope.oriRpt.bestDateToCallStart);
			$scope.bdtcEndMaxDate = todayOfNextYear;
		}
		
	});
	
	$scope.acceptOriRpt = function() {
		var confirmModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to accept Report ' + $scope.oriRpt.confirmationId;
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				oriRptSvc.acceptOriRpt($scope.oriRpt.reportId).then(function(response) {
					if (response.status == 'SUCCESS') {
						$scope.oriRpt.status = response.data.oriRptStatus;
						$scope.rptId = response.data.rptId;
					}
				});
			}
		});
	};
	
	$scope.rejectOriRpt = function() {
		var confirmModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to Reject Report ' + $scope.oriRpt.confirmationId;
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				oriRptSvc.rejectOriRpt($scope.oriRpt.reportId).then(function(response) {
					if (response.status == 'SUCCESS') {
						$scope.oriRpt.status = response.data;
					}
				});
			}
		});
	};
	
	$scope.$watch('oriRpt.status.value', function(newVal, oldVal) {
		if (oldVal !== undefined) {
			if (newVal =='ACCEPTED') {
				var notifyModal = $modal.open({
					animation: true,
					backdrop: 'static',
					templateUrl: '/' + getRootFolderName() + '/resources/app/view/notifyModal.html',
					controller: 'notifyModalCtl',
					size: 'md',
					resolve: {
						msg: function() {
							return 'Report ' + $scope.oriRpt.confirmationId + 'has been successfully accepted.';
						}
					}
				});
				
				notifyModal.result.then(function (status) {
					if(status == 'OK') {
//						to change tree node structure
						$rootScope.moveOriRptToRpt($scope.oriRpt.reportId, $scope.rptId);
						$location.path("/rpt/" + $scope.rptId);
					}
				});
			} else if (newVal == 'REJECTED') {
				var notifyModal = $modal.open({
					animation: true,
					backdrop: 'static',
					templateUrl: '/' + getRootFolderName() + '/resources/app/view/notifyModal.html',
					controller: 'notifyModalCtl',
					size: 'md',
					resolve: {
						msg: function() {
							return 'Report ' + $scope.oriRpt.confirmationId + 'has been successfully rejected.';
						}
					}
				});
				
				notifyModal.result.then(function (status) {
					if(status == 'OK') {
//						to change tree node structure
						$rootScope.moveTreeNode($scope.oriRpt.reportId, 0, 3);
					}
				});
			}
			
		}
	});
});