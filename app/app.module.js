var app = angular.module('app', ['projectsModule','staffModule','UserApp']);
// Include these models in main module
var projectsModule = angular.module('projectsModule', ['ui.router','ngResource','ngSanitize','UserApp']);
var staffModule = angular.module('staffModule', ['ui.router','ngResource','ngSanitize','UserApp']);

app.controller('dashboardCtrl', ['$rootScope', function($rootScope) {
	window.scope = $rootScope;
	$rootScope.section = 'dashboard';
}]);

app.run(['$rootScope','Project' ,'user', function($rootScope, Project, user){
	// Set heartbeat extend TTL by 20 minutes
	user.init({
		appId: '548dbea12fbc1',
		heartbeatInterval: 1200000,
	});
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
