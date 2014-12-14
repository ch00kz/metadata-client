projectsModule.factory('Project', ['$http', function($http){
    return {
    	getList: function() {
    		var projectUrl = "http://localhost:8000/api/v1/project/";

    		var promise = $http({
    			url: projectUrl,
    			method: "GET",
    		});
    		return promise;
    	},
    	getDetails: function(id) {
    		var projectUrl = "http://localhost:8000/api/v1/project/" + id + "/";
    		var promise = $http({
    			url: projectUrl,
    			method: "GET",
    		});
    		return promise;
    	},
    	getForm: function(id) {
    		var formUrl = "http://localhost:8000/form-project/";
    		var promise = $http({
    			url: formUrl,
    			method: "GET",
    		});
    		return promise;
    	}
    };
}]);