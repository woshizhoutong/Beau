app.factory('oriRptSvc', function ($http, $q) {
    return {
    	getOriRptById: function(oriRptId) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('/' + getRootFolderName() + '/report/oriRpt/' + oriRptId)
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
        
        acceptOriRpt: function(oriRptId) {
        	return $http.post('/' + getRootFolderName() + '/report/accept/' + oriRptId)
        		.then(function(response) {
        			if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }
        		}, function(response) {
        			return $q.reject(response.data);
        		});
        },
        
        rejectOriRpt: function(oriRptId) {
        	return $http.post('/' + getRootFolderName() + '/report/reject/' + oriRptId)
        		.then(function(response) {
        			if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }
        		}, function(response) {
        			return $q.reject(response.data);
        		});
        }
    };
});