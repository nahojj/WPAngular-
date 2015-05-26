'use strict';

angular.module('wpangularApp.scroll', [])
	.directive("scroll", ['$window', function ($window) {
		return function(scope, element, attrs) {
			angular.element($window).bind("scroll", function() {
				var mainHeader = $('.main-header').height();
				var heroHeight = $('.hero').height();

				if (this.pageYOffset >= mainHeader) {
					scope.boolChangeClass = true;
					$('.main-header').addClass('active');
				} else {
					scope.boolChangeClass = false;
					$('.main-header').removeClass('active');
				};
				scope.$apply();
			});
		};
	}]);
