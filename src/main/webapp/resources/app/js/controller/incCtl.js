app.controller('incCtl', function ($scope, incSvc, sltValSvc, $routeParams, $location, datepickerPopupConfig) {
	/* Along with the $scope.someOuterObject.someSelectItemList = {}; eg. $scope.inc.bestTimeToCallTimezone = {};
	 * to make sure when ng-model and ng-options both get bound when select directive gets initialized.
	 * Otherwise, if you refresh the page many times, 
	 * you will find that it is possible the select does not get populated correctly.
	 * This explanation is just Xiaodong Yuan's personal option, NOT guaranteed to be right*/
	$scope.inc = {};
	
	/*Start of initializing drop downs*/
	sltValSvc.getSelectionItemsByName('SourceOfEvent').then(function(items) {
		$scope.inc.sourceOfEvent = {};
		$scope.sourceOfEvents = items;
	});
	sltValSvc.getSelectionItemsByName('Timezone').then(function(items) {
		$scope.inc.bestTimeToCallTimezone = {};
		$scope.timezones = items;
	});
	sltValSvc.getSelectionItemsByName('Operation').then(function(items) {
		$scope.inc.happenedOperation = {};
		$scope.operations = items;
	});
	sltValSvc.getSelectionItemsByName('RigType').then(function(items) {
		$scope.inc.rigType = {};
		$scope.rigTypes = items;
	});
	sltValSvc.getSelectionItemsByName('RigComponent').then(function(items) {
		$scope.inc.rigComponent = {};
		$scope.rigComponents = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformType').then(function(items) {
		$scope.inc.platformType = {};
		$scope.platformTypes = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformTypeSub').then(function(items) {
		$scope.inc.platformTypeSub = {};
		$scope.platformTypeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('LocationOnPlatform').then(function(items) {
		$scope.inc.locationOnPlatform = {};
		$scope.locationOnPlatforms = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipeline').then(function(items) {
		$scope.inc.materialInPipeline = {};
		$scope.materialInPipelines = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationMode').then(function(items) {
		$scope.inc.transportationMode = {};
		$scope.transportationModes = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationModeSub').then(function(items) {
		$scope.inc.transportationModeSub = {};
		$scope.transportationModeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('EventLocation').then(function(items) {
		$scope.inc.eventLocation = {};
		$scope.eventLocations = items;
	});
	sltValSvc.getSelectionItemsByName('WorkActivity').then(function(items) {
		$scope.inc.workActivity = {};
		$scope.workActivitys = items;
	});
	sltValSvc.getSelectionItemsByName('LiftingFromAndTo').then(function(items) {
		$scope.inc.liftingFromAndTo = {};
		$scope.liftingFromAndTos = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipelineLH').then(function(items) {
		$scope.inc.materialInPipelineLH = {};
		$scope.materialInPipelineLHs = items;
	});
	sltValSvc.getSelectionItemsByName('DeviceLocation').then(function(items) {
		$scope.inc.deviceLocation = {};
		$scope.deviceLocations = items;
	});
	sltValSvc.getSelectionItemsByName('CommunicationMethod').then(function(items) {
		$scope.inc.communicationMethod = {};
		$scope.communicationMethods = items;
	});
	sltValSvc.getSelectionItemsByName('CraneInstallation').then(function(items) {
		$scope.inc.craneInstallation = {};
		$scope.craneInstallations = items;
	});
	sltValSvc.getSelectionItemsByName('CraneType').then(function(items) {
		$scope.inc.craneType = {};
		$scope.craneTypes = items;
	});
	sltValSvc.getSelectionItemsByName('EquipmentType').then(function(items) {
		$scope.inc.equipmentType = {};
		$scope.equipmentTypes = items;
	});
	sltValSvc.getSelectionItemsByName('LoadType').then(function(items) {
		$scope.inc.loadType = {};
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
	
	var today = new Date();
	$scope.doeMaxDate = today;
	$scope.lidMaxDate = today;
	/*End of initializing datepickers*/
	
	/*Initialize all fields*/
	incSvc.getIncById($routeParams.incId).then(function(response) {
		$scope.inc = response.data;
		
		/*Start of setting the selected values for all drop downs*/
		angular.forEach($scope.sourceOfEvents, function(item, key) {
			if ($scope.inc.sourceOfEvent.value === item.value) 
				$scope.inc.sourceOfEvent = item;
		});
		angular.forEach($scope.operations, function(item, key) {
			if ($scope.inc.happenedOperation.value === item.value) 
				$scope.inc.happenedOperation = item;
		});
		angular.forEach($scope.timezones, function(item, key) {
			if ($scope.inc.timeOfEventTimezone.value === item.value) 
				$scope.inc.timeOfEventTimezone = item;
		});
		angular.forEach($scope.operations, function(item, key) {
			if ($scope.inc.happenedOperation.value === item.value) 
				$scope.inc.happenedOperation = item;
		});
		angular.forEach($scope.rigTypes, function(item, key) {
			if ($scope.inc.rigType.value === item.value) 
				$scope.inc.rigType = item;
		});
		angular.forEach($scope.rigComponents, function(item, key) {
			if ($scope.inc.rigComponent.value === item.value) 
				$scope.inc.rigComponent = item;
		});
		angular.forEach($scope.platformTypes, function(item, key) {
			if ($scope.inc.platformType.value === item.value) 
				$scope.inc.platformType = item;
		});
		angular.forEach($scope.platformTypeSubs, function(item, key) {
			if ($scope.inc.platformTypeSub.value === item.value) 
				$scope.inc.platformTypeSub = item;
		});
		angular.forEach($scope.locationOnPlatforms, function(item, key) {
			if ($scope.inc.locationOnPlatform.value === item.value) 
				$scope.inc.locationOnPlatform = item;
		});
		angular.forEach($scope.materialInPipelines, function(item, key) {
			if ($scope.inc.materialInPipeline.value === item.value) 
				$scope.inc.materialInPipeline = item;
		});
		angular.forEach($scope.transportationModes, function(item, key) {
			if ($scope.inc.transportationMode.value === item.value) 
				$scope.inc.transportationMode = item;
		});
		angular.forEach($scope.transportationModeSubs, function(item, key) {
			if ($scope.inc.transportationModeSub.value === item.value) 
				$scope.inc.transportationModeSub = item;
		});
		angular.forEach($scope.eventLocations, function(item, key) {
			if ($scope.inc.eventLocation.value === item.value) 
				$scope.inc.eventLocation = item;
		});
		angular.forEach($scope.workActivitys, function(item, key) {
			if ($scope.inc.workActivity.value === item.value) 
				$scope.inc.workActivity = item;
		});
		angular.forEach($scope.liftingFromAndTos, function(item, key) {
			if ($scope.inc.liftingFromAndTo.value === item.value) 
				$scope.inc.liftingFromAndTo = item;
		});
		angular.forEach($scope.materialInPipelineLHs, function(item, key) {
			if ($scope.inc.materialInPipelineLH.value === item.value) 
				$scope.inc.materialInPipelineLH = item;
		});
		angular.forEach($scope.deviceLocations, function(item, key) {
			if ($scope.inc.deviceLocation.value === item.value) 
				$scope.inc.deviceLocation = item;
		});
		angular.forEach($scope.communicationMethods, function(item, key) {
			if ($scope.inc.communicationMethod.value === item.value) 
				$scope.inc.communicationMethod = item;
		});
		angular.forEach($scope.craneInstallations, function(item, key) {
			if ($scope.inc.craneInstallation.value === item.value) 
				$scope.inc.craneInstallation = item;
		});
		angular.forEach($scope.craneTypes, function(item, key) {
			if ($scope.inc.craneType.value === item.value) 
				$scope.inc.craneType = item;
		});
		angular.forEach($scope.equipmentTypes, function(item, key) {
			if ($scope.inc.equipmentType.value === item.value) 
				$scope.inc.equipmentType = item;
		});
		angular.forEach($scope.loadTypes, function(item, key) {
			if ($scope.inc.loadType.value === item.value) 
				$scope.inc.loadType = item;
		});
		/*End of setting the selected values for all drop downs*/
	});
	
	$scope.$watch('inc.status', function(newVal) {
		if (newVal !== undefined) {
			if(newVal.value === 'FINALIZED') {
				$scope.editable = false;
			} else {
				$scope.editable = true;
			}
		}
	});
});