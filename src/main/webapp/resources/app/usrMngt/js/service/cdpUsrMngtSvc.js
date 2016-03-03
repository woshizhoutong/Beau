app.factory('cdpUsrMngtSvc', function ($http, $q) {
	return {
		listRequests: function() {
    		return $http.get('/' + getRootFolderName() + '/userManagement/cdp/listRequests')
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
        
        listExisting: function() {
    		return $http.get('/' + getRootFolderName() + '/userManagement/cdp/listExisting')
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
        
        approveUser: function(user) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/approve', user)
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
        
        rejectUser: function(userId) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/reject', userId)
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
        
        updateUser: function(user) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/update', user)
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
        
        removeUser: function(user) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/remove', user)
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
        
        listCompanies: function() {
    		return $http.get('/' + getRootFolderName() + '/userManagement/cdp/company/list')
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
        
        generateEmptyCompany: function() {
        	return $http.get('/' + getRootFolderName() + '/userManagement/cdp/generateEmptyCompany')
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
        
        findCompany: function(comId) {
        	return $http.get('/' + getRootFolderName() + '/userManagement/cdp/findCompany/' + comId)
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
        
        saveCompanyDraft: function(cModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/saveCompanyDraft', cModel)
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
        
        finalizeCompanyCreation: function(cModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/finalizeCompanyCreation', cModel)
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
        
        updateCompany: function(cModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/updateCompany', cModel)
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
        
        removeCompany: function(cModel) {
        	return $http.post('/' + getRootFolderName() + '/userManagement/cdp/removeCompany', cModel)
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