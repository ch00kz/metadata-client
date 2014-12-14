app.config(function($stateProvider){
	$stateProvider
	    .state('projects', {
	      	url: "/projects",
	      	templateUrl: "app/projects/partials/project_dashboard.html",
	      	controller: "ProjectsCtrl",
	    })
	    .state('projectCreate', {
	      	url: "/projects/new",
	      	templateUrl: "app/projects/partials/new_project.html",
	      	controller: "ProjectCreateCtrl",
	    })
	    .state('projectDetail', {
	      	url: "/projects/:projectId",
	      	templateUrl: "app/projects/partials/project_detail.html",
	      	controller: "ProjectDetailCtrl",
	    });
});