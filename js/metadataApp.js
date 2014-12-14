 // Main Module
var metadataApp = angular.module('metadataApp', ['ui.router','ngResource','ngSanitize']);

metadataApp.config(function($stateProvider){
	$stateProvider
	    .state('projects', {
	      	url: "/projects",
	      	templateUrl: "partials/projects.html",
	      	controller: "ProjectsController",
	    })
	    .state('projectCreate', {
	      	url: "/projects/new",
	      	templateUrl: "partials/project_new.html",
	      	controller: "ProjectCreateController",
	    })
	    .state('projectDetail', {
	      	url: "/projects/:projectId",
	      	templateUrl: "partials/project_detail.html",
	      	controller: "ProjectDetailController",
	    });

});

metadataApp.controller('ProjectsController', ['$rootScope','Project', function($rootScope,$scope,Project) {

	window.scope = $rootScope;
}]);

metadataApp.controller('ProjectCreateController', ['$rootScope','Project','$compile', '$scope', function($rootScope,Project,$compile,$scope) {

	Project.getForm().then(function(response){
		var html = response.data;
		var linkToScope = $compile(html);
        var compiledHTML = linkToScope($scope);
        $(document).ready(function(){
	  		$('#create-project-form-container').append(compiledHTML);
        });
	});

 	$scope.createProject = function(){
		$scope.params = {
			"name": $scope.name,
			"category": $scope.category,
			"currency": $scope.currency,
			"start_date": $scope.start_date,
			"status": $scope.status,
			"value": $scope.value,
			"department": $scope.department,
			"clients": $scope.clients,
			"description": $scope.description,
			"expected_end_date": $scope.expected_end_date,
			"actual_end_date": $scope.actual_end_date,
			"lead_staff": $scope.lead_staff,
			"assisting_staff": $scope.assisting_staff
		};
		console.log($scope.params);
	};

	window.scope = $scope;

}]);
metadataApp.controller('ProjectDetailController', ['$rootScope','Project','$stateParams', function($rootScope, Project, $stateParams) {

	$rootScope.staffId = $stateParams.staffId;

	Project.getDetails($stateParams.projectId).then(function(response){
		$rootScope.selectedProject = response.data;
	});

	//shrink header for details container
	var content = $("#content")[0];
	var header = $(content).children('.detail-header')[0];
	$(content).scroll(function(){
		if ($(content).scrollTop() > 170) {
			$(header).addClass("shrinkAndFix");
		} else {
			$(header).removeClass("shrinkAndFix");
		}
	});

	window.scope = $rootScope;
}]);

metadataApp.factory('Project', ['$http', function($http){
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

metadataApp.run(['$rootScope','Project' , function($rootScope, Project){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("Going to state ->", toState.name);

		// Remove selected Project is moving away from detail page.
		if (toState.name != "projectDetail") {
			$rootScope.selectedProject = 0;
		}

		// Fetch list of projects and set section to project
		var goingToProjectState = toState.name == "projects" || toState.name == "projectCreate" || toState.name == "projectDetail";
		if (goingToProjectState){
			$rootScope.section = 'projects';
			if(!$rootScope.projects) {
				Project.getList().then(function(response){
					$rootScope.projects = response.data.objects;
				});
			}
		}
	});
}]);



//  // Main Module
// var metadataApp = angular.module('metadataApp', ['ui.router']);

// metadataApp.config(function($stateProvider, $urlRouterProvider){})

// authModule.config(function($stateProvider, $urlRouterProvider) {
// 	$stateProvider
// 	    .state('login', {
// 	      	url: "/login",
// 	      	templateUrl: "partials/login.html",
// 	      	controller: 'loginController',

// 	    })
// 	    .state('logout', {
// 	  		url: "/logout",
// 	      	templateUrl: "partials/logout.html",
// 	      	controller: 'logoutController',
// 	    })
// 	    .state('404', {
// 	  		url: "/404",
// 	      	templateUrl: "partials/404.html",
// 	    });
// });

// metadataApp.config(['$urlRouterProvider', function($urlRouterProvider) {
// 	// If page not recognized, route to
// 	$urlRouterProvider.otherwise("/404");
// }]);

// metadataApp.run(['$rootScope', 'AuthService', '$location', function($rootScope, AuthService, $location){
// 	// check for username and token in session
// 	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
// 		if (toState.name != "login" && !AuthService.isLoggedIn()) {
// 			$location.path('login');
// 		}
// 	});
// }]);

// staffModule.config(function($stateProvider, $urlRouterProvider) {
// 	$stateProvider
// 	    .state('staff', {
// 	      	url: "/staff",
// 	      	templateUrl: "partials/staff.html",
// 	      	controller: 'staffController',

// 	    })
// 	    .state('staff.detail', {
// 	  		url: "/:staffId",
// 	      	templateUrl: "partials/staffDetails.html",
// 	      	controller: 'staffDetailController',
// 	    });
// });

// projectsModule.config(function($stateProvider, $urlRouterProvider) {
// 	$stateProvider
// 	    .state('projects', {
// 	      	url: "/projects",
// 	      	templateUrl: "partials/projects.html",
// 	      	controller: 'projectsController',
// 	    });
// });