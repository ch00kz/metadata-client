projectsModule.run(['$rootScope', 'Project', function($rootScope, Project){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		// Remove selected Project is moving away from detail page.
		if (toState.name != "projectDetail") {
			$rootScope.selectedProject = 0;
		}

		if(!$rootScope.projects) {
			Project.getList().then(function(response){
				$rootScope.projects = response.data.objects;
			});
		}
	});
}]);

projectsModule.controller('ProjectsCtrl', ['$rootScope','$scope','Project', function($rootScope,$scope,Project) {
	window.scope = $rootScope;
}]);

projectsModule.controller('ProjectCreateCtrl', ['$rootScope','Project','$compile', '$scope', function($rootScope,Project,$compile,$scope) {
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

projectsModule.controller('ProjectDetailCtrl', ['$rootScope','Project','$stateParams', function($rootScope, Project, $stateParams) {

	$rootScope.staffId = $stateParams.staffId;

	Project.getDetails($stateParams.projectId).then(function(response){
		$rootScope.selectedProject = response.data;
	});

	//shrink header for details container
	var content = $("#content")[0];
	var header = $(content).children('.detail-header')[0];
	var title = $(header).children('.title')[0];
	var originalHeight = $(header).height();
	$(content).scroll(function(){
		var scrollAmount = $(content).scrollTop();
		if (!($(header).hasClass('shrinkAndFix'))) {
			if ($(title).offset().top < 43)
			{
				$(header).addClass("shrinkAndFix");
				$(header).parent().css('padding-top', originalHeight - 43);
			}
		}
		if (scrollAmount == 0){
			// $(header).height(originalHeight);
			$(header).removeClass("shrinkAndFix");
			$(header).parent().css('padding-top', 0);
		}
	});

	window.scope = $rootScope;

}]);

