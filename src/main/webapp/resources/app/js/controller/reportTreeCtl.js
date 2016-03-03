app.controller('reportTreeCtl', reportTreeCtl);

function reportTreeCtl($scope, $rootScope, $http, $location, $routeParams) {
//	$http.get("http://localhost:8080/ccpm/tree/report").success(function(response) {
	$http.get('/' + getRootFolderName() + '/tree/report').success(function(response) {
		$rootScope.treedata = response;
	});
	
	$scope.predicate = "";
    $scope.comparator = false;
	
	$scope.opts = {
			allowDeselect: false,
			/*isLeaf: function(node) {
				return node.isLeaf;
			},*/
			injectClasses: {
	             "ul": "c-ul",
	             "li": "c-li",
	             "liSelected": "c-liSelected",
	             "iExpanded": "c-iExpanded",
	             "iCollapsed": "c-iCollapsed",
	             "iLeaf": "c-iLeaf",
	             "label": "c-label",
	             "labelSelected": "c-labelSelected"
	         }
	};
	
	$scope.iconClass = function(node) {
		if (node.file == true) {
			return 'glyphicon glyphicon-file';
		}
		return 'glyphicon glyphicon-folder-open';
	};
	
	$scope.labelClass = function(node) {
		if (node.nodeType === '') {
			return 'glyphicon glyphicon-file';
		}
		return 'text-warning';
	};
	
	$scope.showReport = function(node) {
		if (node.nodeType === 'REPORT') {
			$location.path("/rpt/" + node.id);
		} else if (node.nodeType === 'ORIGINAL_REPORT') {
			$location.path("/oriRpt/" + node.id);
		} else if (node.nodeType === 'INCIDENT') {
			$location.path("/inc/" + node.id);
		} else if (node.nodeType === 'INTERVIEW') {
			$location.path("/itvs/" + node.id);
		}
	};
	
	$rootScope.moveOriRptToRpt = function(oriRptId, rptId) {
		angular.forEach($rootScope.treedata[0].children, function(node, i) {
			if (node.id == oriRptId) {
				var newRpt = {
						label: node.label, 
						id: rptId,
						file: true,
						leaf: false,
						nodeType: 'REPORT',
						children: [{
							label: 'Original Report',
							id: node.id,
							file: true,
							leaf: true,
							nodeType: 'ORIGINAL_REPORT'
						}]
				};
				$rootScope.treedata[1].children.push(newRpt);
				$rootScope.treedata[0].children.splice(i, 1);
			}
		});
    };
    
    $rootScope.moveTreeNode = function(oldId, fromFolderIndex, toFolderIndex) {
		angular.forEach($rootScope.treedata[fromFolderIndex].children, function(node, i) {
			if (node.id == oldId) {
				$rootScope.treedata[toFolderIndex].children.push(node);
				$rootScope.treedata[fromFolderIndex].children.splice(i, 1);
			}
		});
    };
}

