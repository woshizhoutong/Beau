app.factory('rptSvc', function ($http, $q) {
	return {
		getRptById: function(rptId) {
			// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/report/rpt/' + rptId)
    		.then(function(response) {
    			if (typeof response.data === 'object') {
    				return response.data;
    			} else {
    				// invalid response
    				return $q.reject(response.data);
    			}
    		}, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
        },
        
        linkRptToNewInc: function(rptId) {
        	return $http.get('/' + getRootFolderName() + '/report/linkReportToNewIncident/' + rptId)
        	.then(function(response) {
        		if (typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
                    return $q.reject(response.data);
        		}
        	}, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
        },
        
        linkRptToExistingInc: function(rptId, incId) {
        	return $http.get('/' + getRootFolderName() + '/report/linkReportToExistingIncident/' + rptId + '/' + incId)
        	.then(function(response) {
        		if (typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
                    return $q.reject(response.data);
        		}
        	}, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
        },
        
        schItv: function(rptId, itvViewModel) {
        	return $http.post('/' + getRootFolderName() + '/interview/scheduleInterview/' + rptId, itvViewModel)
        	.then(function(response) {
        		if (typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
                    return $q.reject(response.data);
        		}
        	}, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
        },
        
        finalize: function(rptId, finalizeIncident) {
        	return $http.get('/' + getRootFolderName() + '/report/finalize/' + rptId + '/' + finalizeIncident)
        	.then(function(response) {
        		if (typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
                    return $q.reject(response.data);
        		}
        	}, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
        }
    };
});