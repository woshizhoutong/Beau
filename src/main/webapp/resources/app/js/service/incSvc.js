app.factory('incSvc', function ($http, $q) {
	return {
		getIncById: function(incId) {
			// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/incident/find/' + incId)
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
        
        getIncsByTimeAndRange: function(time, range) {
        	return $http.get('/' + getRootFolderName() + '/incident/list/' + time + '/' + range)
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