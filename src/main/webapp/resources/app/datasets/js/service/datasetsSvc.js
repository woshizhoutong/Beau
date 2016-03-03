app.factory('datasetsSvc', function ($http, $q) {
	return {
        listCompanies: function() {
    		return $http.get('/' + getRootFolderName() + '/dataset/listCompanies')
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
        
        download: function(datasetId) {
    		return $http.get('/' + getRootFolderName() + '/dataset/download/' + datasetId)
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
        
        getNewUploadedByCompanyId: function(comId) {
    		return $http.get('/' + getRootFolderName() + '/dataset/getNewUploadedByCompanyId/' + comId)
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
        
        getDownloadedByCompanyId: function(comId) {
    		return $http.get('/' + getRootFolderName() + '/dataset/getDownloadedByCompanyId/' + comId)
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
        
        remove: function(dataset) {
    		return $http.post('/' + getRootFolderName() + '/dataset/delete/', dataset)
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