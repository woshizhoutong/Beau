app.factory('newsSvc', function ($http, $q) {
	return {
		listNmrsNewReports: function() {
    		return $http.get('/' + getRootFolderName() + '/news/listNmrsNewReports')
    		.then(function(response) {
    			if (typeof response.data === 'object') {
    				return response.data;
    			} else {
    				return $q.reject(response.data);
    			}
    		}, function(response) {
                return $q.reject(response.data);
            });
        },
        
        listCdpNewAccountRequests: function() {
    		return $http.get('/' + getRootFolderName() + '/news/listCdpNewAccountRequests')
    		.then(function(response) {
    			if (typeof response.data === 'object') {
    				return response.data;
    			} else {
    				return $q.reject(response.data);
    			}
    		}, function(response) {
                return $q.reject(response.data);
            });
        },
        
        listCdpNewDatasets: function() {
    		return $http.get('/' + getRootFolderName() + '/news/listCdpNewDatasets')
    		.then(function(response) {
    			if (typeof response.data === 'object') {
    				return response.data;
    			} else {
    				return $q.reject(response.data);
    			}
    		}, function(response) {
                return $q.reject(response.data);
            });
        },
    };
});