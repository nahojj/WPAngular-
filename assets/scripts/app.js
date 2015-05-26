'use strict';

angular.module('wpangularApp', [
	'ngRoute',
	'ngSanitize',
	'ngLoadingScreen',
	'wpangularApp.api',
	'wpangularApp.main',
	'wpangularApp.scroll',
	'wpangularApp.about',
	'wpangularApp.post'
	])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

    $routeProvider
			.when('/', {
				templateUrl	: myLocalized.views + 'main.html',
				controller	: 'mainCtrl'
			})
			.when('/home', {
				templateUrl	: myLocalized.views + 'main.html',
				controller	: 'mainCtrl'
			})
			.when('/about', {
				templateUrl	: myLocalized.views + 'about.html',
				controller	: 'aboutCtrl'
			})
			.when('/:slug', {
				templateUrl : myLocalized.views + 'post.html',
				controller	: 'postCtrl'
			})
      .otherwise({
        redirectTo	: '/'
      });
  }])
	.controller('appCtrl', ['$scope', '$location', 'api', function($scope, $location, api) {
		// Show loading-screen
		$scope.showLoader = true;
		// When everything is loaded
		jQuery(window).load(function () {
			// Hide loading-screen
			$scope.showLoader = false;
		});

		// Get Menu by ID
		api.getMenu(2).then(function(res) {
			$scope.menuItems = res.items;

			$scope.navClass = function (page) {
				var currentRoute = $location.path().substring(1) || 'home';
				return page === currentRoute ? 'active' : '';
			};
		});

		// Hide Menu
		$scope.menuOpened = "menu-hidden";
		// On click, run function and show menu
    $scope.menuClick = function() {
      if ($scope.menuOpened === "menu-hidden") {
				$scope.menuOpened = "menu-show";
				$('.toggle-menu').addClass('x');
				$('.main-header').addClass('active-nav');
			} else {
				$scope.menuOpened = "menu-hidden";
				$('.toggle-menu').removeClass('x');
				$('.main-header').removeClass('active-nav');
			};

			// Get menu item
			var menuLink = $('.navigation ul li a');

			if($scope.menuOpened === "menu-show") {
				menuLink.on('click', function() {
					$scope.menuOpened = "menu-hidden";
					$('.toggle-menu').removeClass('x');
					$('.main-header').removeClass('active-nav');
				});
			};
		};
	}]);
