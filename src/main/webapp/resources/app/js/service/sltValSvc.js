app.factory('sltValSvc', function ($http, $q) {
    return {
    	getSelectionItemsByName: function(name) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('/' + getRootFolderName() + '/selectionValue/' + name)
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
        
        getApprovedCompanies: function() {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('/' + getRootFolderName() + '/selectionValue/getApprovedCompanies')
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
        
        getAllRoleTypes: function() {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('/' + getRootFolderName() + '/selectionValue/getAllRoleTypes')
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
    };
});