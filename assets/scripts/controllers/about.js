'use strict';

angular.module('wpangularApp.about', [])
	.controller('aboutCtrl', ['$scope', '$http', 'api', function($scope, $http, api) {
		console.log('About file loaded.');

		$http.get('/wp-json/pages/').success(function(res) {
			$scope.pages = res;
			console.log(res);
		});

		// Get page witd id 26 (About)
		api.getPages(26).then(function(res) {
			$scope.about = res;
			console.log(res);
		});
	}]);
