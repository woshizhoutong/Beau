app.controller('rptCtl', function ($scope, $rootScope, $timeout, rptSvc, incSvc, sltValSvc, $routeParams, $location, datepickerPopupConfig, $modal, QuestionService, $log) {
	/* Along with the $scope.someOuterObject.someSelectItemList = {}; eg. $scope.rpt.bestTimeToCallTimezone = {};
	 * to make sure when ng-model and ng-options both get bound when select directive gets initialized.
	 * Otherwise, if you refresh the page many times, 
	 * you will find that it is possible the select does not get populated correctly.
	 * This explanation is just Xiaodong Yuan's personal option, NOT guaranteed to be right*/
	$scope.rpt = {};
	/*Start of initializing drop downs*/
	sltValSvc.getSelectionItemsByName('Timezone').then(function(items) {
		$scope.rpt.bestTimeToCallTimezone = {};
		$scope.timezones = items;
	});
	sltValSvc.getSelectionItemsByName('Operation').then(function(items) {
		$scope.rpt.operation = {};
		$scope.operations = items;
	});
	sltValSvc.getSelectionItemsByName('JobPosition').then(function(items) {
		$scope.rpt.jobPosition = {};
		$scope.jobPositions = items;
	});
	sltValSvc.getSelectionItemsByName('SourceOfEvent').then(function(items) {
		$scope.rpt.sourceOfEvent = {};
		$scope.sourceOfEvents = items;
	});
	sltValSvc.getSelectionItemsByName('RigType').then(function(items) {
		$scope.rpt.rigType = {};
		$scope.rigTypes = items;
	});
	sltValSvc.getSelectionItemsByName('RigComponent').then(function(items) {
		$scope.rpt.rigComponent = {};
		$scope.rigComponents = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformType').then(function(items) {
		$scope.rpt.platformType = {};
		$scope.platformTypes = items;
	});
	sltValSvc.getSelectionItemsByName('PlatformTypeSub').then(function(items) {
		$scope.rpt.platformTypeSub = {};
		$scope.platformTypeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('LocationOnPlatform').then(function(items) {
		$scope.rpt.locationOnPlatform = {};
		$scope.locationOnPlatforms = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipeline').then(function(items) {
		$scope.rpt.materialInPipeline = {};
		$scope.materialInPipelines = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationMode').then(function(items) {
		$scope.rpt.transportationMode = {};
		$scope.transportationModes = items;
	});
	sltValSvc.getSelectionItemsByName('TransportationModeSub').then(function(items) {
		$scope.rpt.transportationModeSub = {};
		$scope.transportationModeSubs = items;
	});
	sltValSvc.getSelectionItemsByName('EventLocation').then(function(items) {
		$scope.rpt.eventLocation = {};
		$scope.eventLocations = items;
	});
	sltValSvc.getSelectionItemsByName('WorkActivity').then(function(items) {
		$scope.rpt.workActivity = {};
		$scope.workActivitys = items;
	});
	sltValSvc.getSelectionItemsByName('LiftingFromAndTo').then(function(items) {
		$scope.rpt.liftingFromAndTo = {};
		$scope.liftingFromAndTos = items;
	});
	sltValSvc.getSelectionItemsByName('MaterialInPipelineLH').then(function(items) {
		$scope.rpt.materialInPipelineLH = {};
		$scope.materialInPipelineLHs = items;
	});
	sltValSvc.getSelectionItemsByName('DeviceLocation').then(function(items) {
		$scope.rpt.deviceLocation = {};
		$scope.deviceLocations = items;
	});
	sltValSvc.getSelectionItemsByName('CommunicationMethod').then(function(items) {
		$scope.rpt.communicationMethod = {};
		$scope.communicationMethods = items;
	});
	sltValSvc.getSelectionItemsByName('CraneInstallation').then(function(items) {
		$scope.rpt.craneInstallation = {};
		$scope.craneInstallations = items;
	});
	sltValSvc.getSelectionItemsByName('CraneType').then(function(items) {
		$scope.rpt.craneType = {};
		$scope.craneTypes = items;
	});
	sltValSvc.getSelectionItemsByName('EquipmentType').then(function(items) {
		$scope.rpt.equipmentType = {};
		$scope.equipmentTypes = items;
	});
	sltValSvc.getSelectionItemsByName('LoadType').then(function(items) {
		$scope.rpt.loadType = {};
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
	rptSvc.getRptById($routeParams.rptId).then(function(response) {
		$scope.rpt = response.data;
		
		if ($scope.rpt.interviewStatus.value === 'FINISHED_SUCCESS') {
			QuestionService.listByVersionNumAndRptId($scope.rpt.reportId, $scope.rpt.questionnaireVersionNum).then(function(response){
				var questions = response;
				answers = [];
				angular.forEach(questions, function(value, key) {
					var answer = QuestionService.getCurrentAnswerWithQuestion(value);
					answers.push(answer);
				});
				$scope.qsts = questions;
				$scope.anss = answers;
			});
		}
		
		
		/*Start of setting the selected values for all drop downs*/
		angular.forEach($scope.timezones, function(item, key) {
			if ($scope.rpt.bestTimeToCallTimezone.value === item.value) 
				$scope.rpt.bestTimeToCallTimezone = item;
		});
		angular.forEach($scope.operations, function(item, key) {
			if ($scope.rpt.operation.value === item.value) 
				$scope.rpt.operation = item;
		});
		angular.forEach($scope.jobPositions, function(item, key) {
			if ($scope.rpt.jobPosition.value === item.value) 
				$scope.rpt.jobPosition = item;
		});
		angular.forEach($scope.sourceOfEvents, function(item, key) {
			if ($scope.rpt.sourceOfEvent.value === item.value) 
				$scope.rpt.sourceOfEvent = item;
		});
		angular.forEach($scope.timezones, function(item, key) {
			if ($scope.rpt.timeOfEventTimezone.value === item.value) 
				$scope.rpt.timeOfEventTimezone = item;
		});
		angular.forEach($scope.operations, function(item, key) {
			if ($scope.rpt.happenedOperation.value === item.value) 
				$scope.rpt.happenedOperation = item;
		});
		angular.forEach($scope.rigTypes, function(item, key) {
			if ($scope.rpt.rigType.value === item.value) 
				$scope.rpt.rigType = item;
		});
		angular.forEach($scope.rigComponents, function(item, key) {
			if ($scope.rpt.rigComponent.value === item.value) 
				$scope.rpt.rigComponent = item;
		});
		angular.forEach($scope.platformTypes, function(item, key) {
			if ($scope.rpt.platformType.value === item.value) 
				$scope.rpt.platformType = item;
		});
		angular.forEach($scope.platformTypeSubs, function(item, key) {
			if ($scope.rpt.platformTypeSub.value === item.value) 
				$scope.rpt.platformTypeSub = item;
		});
		angular.forEach($scope.locationOnPlatforms, function(item, key) {
			if ($scope.rpt.locationOnPlatform.value === item.value) 
				$scope.rpt.locationOnPlatform = item;
		});
		angular.forEach($scope.materialInPipelines, function(item, key) {
			if ($scope.rpt.materialInPipeline.value === item.value) 
				$scope.rpt.materialInPipeline = item;
		});
		angular.forEach($scope.transportationModes, function(item, key) {
			if ($scope.rpt.transportationMode.value === item.value) 
				$scope.rpt.transportationMode = item;
		});
		angular.forEach($scope.transportationModeSubs, function(item, key) {
			if ($scope.rpt.transportationModeSub.value === item.value) 
				$scope.rpt.transportationModeSub = item;
		});
		angular.forEach($scope.eventLocations, function(item, key) {
			if ($scope.rpt.eventLocation.value === item.value) 
				$scope.rpt.eventLocation = item;
		});
		angular.forEach($scope.workActivitys, function(item, key) {
			if ($scope.rpt.workActivity.value === item.value) 
				$scope.rpt.workActivity = item;
		});
		angular.forEach($scope.liftingFromAndTos, function(item, key) {
			if ($scope.rpt.liftingFromAndTo.value === item.value) 
				$scope.rpt.liftingFromAndTo = item;
		});
		angular.forEach($scope.materialInPipelineLHs, function(item, key) {
			if ($scope.rpt.materialInPipelineLH.value === item.value) 
				$scope.rpt.materialInPipelineLH = item;
		});
		angular.forEach($scope.deviceLocations, function(item, key) {
			if ($scope.rpt.deviceLocation.value === item.value) 
				$scope.rpt.deviceLocation = item;
		});
		angular.forEach($scope.communicationMethods, function(item, key) {
			if ($scope.rpt.communicationMethod.value === item.value) 
				$scope.rpt.communicationMethod = item;
		});
		angular.forEach($scope.craneInstallations, function(item, key) {
			if ($scope.rpt.craneInstallation.value === item.value) 
				$scope.rpt.craneInstallation = item;
		});
		angular.forEach($scope.craneTypes, function(item, key) {
			if ($scope.rpt.craneType.value === item.value) 
				$scope.rpt.craneType = item;
		});
		angular.forEach($scope.equipmentTypes, function(item, key) {
			if ($scope.rpt.equipmentType.value === item.value) 
				$scope.rpt.equipmentType = item;
		});
		angular.forEach($scope.loadTypes, function(item, key) {
			if ($scope.rpt.loadType.value === item.value) 
				$scope.rpt.loadType = item;
		});
		/*End of setting the selected values for all drop downs*/
		
		/*Set the min and max for best date to call range, it has to be after setting the value of them, because they are related to their values*/
//		NOT WORKING
		var todayOfNextYear = new Date();
		todayOfNextYear.setDate(todayOfNextYear.getYear() + 1);
		$scope.bdtcStartMinDate = today;
		$scope.bdtcStartMaxDate = $scope.rpt.bestDateToCallEnd == null ? todayOfNextYear : $scope.rpt.bestDateToCallEnd;
		$scope.bdtcEndMinDate = ($scope.rpt.bestDateToCallStart == null ? today : $scope.rpt.bestDateToCallStart);
		$scope.bdtcEndMaxDate = todayOfNextYear;
	});
	
	$scope.$watch('rpt.status', function(newVal) {
		if (newVal !== undefined) {
			if(newVal.value === 'FINALIZED') {
				$scope.editable = false;
			} else {
				$scope.editable = true;
			}
		}
	});
	
	$scope.$watch('rpt.incCaseNum', function(newIncCaseNum, oldVal) {
		/* Checking oldVal !== undefined is for exclude the initializing scenario,
		 * when initializing the page, the rpt.incCaseNum change will be triggered twice,
		 * One is $scope.rpt = {} with oldVal is undefined and newVal is undefined, it is a little confusing,
		 * because they are both undefined, but I think that's because $watch will be trigger when the model is bound.
		 * The Other one is $scope.rpt = response with oldVal is undefined and newVal is null or some meaningful String.
		 * So check oldVal !== undefined will eliminate these two conditions. 
		 * Just Xiaodong Yuan's personal opinion, NOT guaranteed to be correct.*/
		if (oldVal !== undefined) { 
			var linkIncResultModal = $modal.open({
				animation: true,
				backdrop: 'static',
				templateUrl: '/' + getRootFolderName() + '/resources/app/view/linkIncResultModal.html',
				controller: 'linkIncResultModalCtl',
				size: 'small',
				resolve: {
					confirmationId: function() {
						return $scope.rpt.confirmationId;
					},
					incCaseNum: function() {
						return newIncCaseNum;
					}
				}
			});
		}
	});
	
	$scope.linkInc = function (size) {
		var linkIncModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/linkIncModal.html',
			controller: 'linkIncModalCtl',
			size: size,
			resolve: {
				rptId: function() {
					return $scope.rpt.reportId;
				},
				confirmationId: function() {
					return $scope.rpt.confirmationId;
				},
				timeOfEvent: function() {
					return $scope.rpt.timeOfEvent;
				}
			}
		});
		
		linkIncModal.result.then(function (linkedIncCaseNum) {
			$scope.rpt.incCaseNum = linkedIncCaseNum;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.scheduleInterview = function (size) {
		var schItvModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/schItvModal.html',
			controller: 'schItvModalCtl',
			size: size,
			resolve: {
				rptId: function() {
					return $scope.rpt.reportId;
				},
				confirmationId: function() {
					return $scope.rpt.confirmationId;
				},
				bestTimeToCallStart: function() {
					return $scope.rpt.bestTimeToCallStart;
				}
			}
		});
		
		schItvModal.result.then(function (scheduledInterviewTime) {
			$scope.rpt.scheduledInterviewTime = scheduledInterviewTime;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
	$scope.finalize = function() {
		var confirmModal = $modal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '/' + getRootFolderName() + '/resources/app/view/confirmModal.html',
			controller: 'confirmModalCtl',
			size: 'md',
			resolve: {
				msg: function() {
					return 'Are you sure you want to finalize Report ' + $scope.rpt.confirmationId;
				}
			}
		});
		
		confirmModal.result.then(function (status) {
			if(status == 'CONFIRM') {
				rptSvc.finalize($scope.rpt.reportId, false).then(function(response) {
					if (response.status == 'SUCCESS') {
						$scope.rpt = response.data;
//						to change tree node structure
						$rootScope.moveTreeNode($scope.rpt.reportId, 1, 2);
					}
				});
			}
		});
	};
});