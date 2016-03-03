app.factory('itvSvc', function ($http, $q) {
	return {
		getItvsByRptId: function(rptId) {
			// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/interview/listByReportId/' + rptId)
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
        
        startItv: function(itvId) {
        	// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/interview/startInterview/' + itvId)
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
        
        finishReviewRpt: function(rptId, rptVM) {
        	// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.post('/' + getRootFolderName() + '/report/save/' + rptId, rptVM)
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
        
        finishInterview: function(itvId, status) {
        	// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/interview/finishInterview/' + itvId + '/' + status)
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
        
        reportInterviewStatus: 'INTERVIEWING',
        
    };
});