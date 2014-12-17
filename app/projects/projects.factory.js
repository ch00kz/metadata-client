projectsModule.factory('Project', ['$http', function($http){
    var url = "http://localhost:8000";
    // var url = "http://104.236.6.55:8000";
    return {
    	getList: function() {
    		var projectUrl = url + "/api/v1/project/";

    		var promise = $http({
    			url: projectUrl,
    			method: "GET",
    		});
    		return promise;
    	},
    	getDetails: function(id) {
    		var projectUrl = url + "/api/v1/project/" + id + "/";
    		var promise = $http({
    			url: projectUrl,
    			method: "GET",
    		});
    		return promise;
    	},
    	getForm: function(id) {
    		var formUrl = url + "/form-project/";
    		var promise = $http({
    			url: formUrl,
    			method: "GET",
    		});
    		return promise;
    	},
        createProject: function(params){
            var promise = $http({
                url: projectUrl,
                method: "POST",
                data: JSON.strigify(params),
                contentType: "application/json"
            });
            return promise;
        }
    };
}]);