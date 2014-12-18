projectsModule.factory('Project', ['$http', function($http){
    var url = "http://localhost:8000";
    // var url = "http://104.236.6.55:8000";
    var projectUrl = url + "/api/v1/project/";

    return {
    	getList: function() {
    		var promise = $http({
    			url: projectUrl,
    			method: "GET",
    		});
    		return promise;
    	},
    	getDetails: function(id) {
    		var url = projectUrl + id + "/";
    		var promise = $http({
    			url: url,
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
            var url = projectUrl + "create/";

           return $.post(
                url,
                {
                    data: JSON.stringify(params),
                },
                function(response) {
                    console.log("Hit End Point");
                },"json"
            );

        }
    };
}]);