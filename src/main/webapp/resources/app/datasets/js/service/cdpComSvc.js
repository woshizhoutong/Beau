app.factory('cdpComSvc', function ($http, $q) {
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
    };
});