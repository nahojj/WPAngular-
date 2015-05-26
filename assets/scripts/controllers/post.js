'use strict';

angular.module('wpangularApp.post', [])
	.controller('postCtrl', ['$scope', '$http', 'api', function($scope, $http, api) {
		// Show loading-screen
		$scope.showLoader = true;
		// When everything is loaded
		jQuery(window).load(function () {
			// Hide loading-screen
			$scope.showLoader = false;
		});

		api.getPost().then(function(res) {
			$scope.post = res;
    });
  }]);
