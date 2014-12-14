app.config(function($stateProvider){
	$stateProvider
		//	project Routes
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
	    })
	    // 	staff Routes
	    .state('staff', {
	      	url: "/staff",
	      	templateUrl: "app/staff/partials/staff_dashboard.html",
	      	controller: "StaffCtrl",
	    })
	    //	client Routes
	;
});