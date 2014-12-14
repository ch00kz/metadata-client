var app = angular.module('app', ['projectsModule','staffModule']);
// Include these models in main module
var projectsModule = angular.module('projectsModule', ['ui.router','ngResource','ngSanitize']);
var staffModule = angular.module('staffModule', ['ui.router','ngResource','ngSanitize']);

app.run(['$rootScope','Project' , function($rootScope, Project){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("Going to state ->", toState.name);

		var goingToProjectState = toState.name == "projects" || toState.name == "projectCreate" || toState.name == "projectDetail";
		var goingToStaffState = toState.name == "staff";

		if (goingToProjectState){
			$rootScope.section = 'projects';
		}
		else if (goingToStaffState) {
			$rootScope.section = 'staff';
		}
		else {
			console.log("Where are you going?");
		}
	});
}]);
