app.factory('ccpmUsrMngtSvc', function ($http, $q) {
	return {
		listExisting: function() {
    		return $http.get('/' + getRootFolderName() + '/userManagement/ccpm/listExisting')
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
        
        generateEmptyUser: function() {
    		return $http.get('/' + getRootFolderName() + '/userManagement/ccpm/generateEmptyUser')
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
        
        findUser: function(uId) {
    		return $http.get('/' + getRootFolderName() + '/userManagement/ccpm/findUser/' + uId)
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
        
        addUser: function(uModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/ccpm/add', uModel)
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
        
        updateUser: function(uModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/ccpm/update', uModel)
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
        
        removeUser: function(uModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/ccpm/remove', uModel)
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