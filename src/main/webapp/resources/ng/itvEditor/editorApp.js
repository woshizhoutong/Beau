var editorApp = angular.module("editor",['ngRoute', 'ui.bootstrap']);

editorApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'editorController',
		templateUrl: '../resources/ng/itvEditor/views/main.html'
	})
//	.when('/:versionNum', {
//		controller: 'editorController',
//		templateUrl: '../resources/ng/test/views/main.html'
//	})
//	.when('/error', {
//		templateUrl: '../resources/ng/views/pageNotFound.html'
//	})
	;
}]);

