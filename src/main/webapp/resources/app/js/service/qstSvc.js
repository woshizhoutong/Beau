app.factory('qstSvc', function ($http, $q) {
	return {
		nextQst: function(qstNum) {
			// the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
    		return $http.get('/' + getRootFolderName() + '/qustion/find/' + qstNum)
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