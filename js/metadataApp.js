 // Main Module
var metadataApp = angular.module('metadataApp', ['ui.router','ngResource']);

metadataApp.config(function($stateProvider){
	$stateProvider
	    .state('projects', {
	      	url: "/projects",
	      	templateUrl: "partials/projects.html",
	      	controller: "ProjectsController",
	    })
	    .state('projectDetail', {
	      	url: "/projects/:projectId",
	      	templateUrl: "partials/project_detail.html",
	      	controller: "ProjectDetailController",
	    });
});

metadataApp.controller('ProjectsController', ['$rootScope','Project', function($rootScope,Project) {
	$rootScope.section = 'projects';

	Project.getList().then(function(response){
		$rootScope.projects = response.data.objects;
	});

	window.scope = $rootScope;
}]);

metadataApp.controller('ProjectDetailController', ['$rootScope','Project','$stateParams', function($rootScope, Project, $stateParams) {

	$rootScope.section = 'projects';

	if(!$rootScope.projects) {
		Project.getList().then(function(response){
			$rootScope.projects = response.data.objects;
		});
	}

	$rootScope.staffId = $stateParams.staffId;

	Project.getDetails($stateParams.projectId).then(function(response){
		$rootScope.selectedProject = response.data;
	});

	//shrink header for details container
	var content = $("#content")[0];
	var header = $(content).children('.detail-header')[0];
	$(content).scroll(function(){
		if ($(content).scrollTop() > 50) {
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
    	}
    };
}]);

metadataApp.run(['$rootScope', function($rootScope){
	// check for username and token in session
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if (!(toState.name == "projectDetails" || toState.name == "projectLogs")) {

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