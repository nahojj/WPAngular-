'use strict';

angular.module('wpangularApp.api', [])
  .factory('api', ['$http', '$q', '$routeParams', function ($http, $q, $routeParams) {

		var baseUrl = '/wp-json/';

    return {
      // Get JSON
      getJSON: function (id) {
				var q = $q.defer();
				$http.get(baseUrl).success(function (res) {
					q.resolve(res);
				});
				return q.promise;
			},

      // Get Menu
			getMenu: function (id) {
				var q = $q.defer();
				$http.get(baseUrl + 'menus/' + id).success(function (res) {
					q.resolve(res);
				});
				return q.promise;
			},

			// Get Category by ID
			getCat: function (id) {
				var q = $q.defer();
				$http.get(baseUrl + 'posts?filter[posts_per_page]=3&filter[cat]=' + id).success(function (res) {
					q.resolve(res);
				});
				return q.promise;
			},

			// Get pages
			getPages: function(id) {
				var q = $q.defer();
				$http.get(baseUrl + 'pages/' + id).success(function (res) {
					q.resolve(res)
				});
				return q.promise;
			},

			// Get all Posts
      getPosts: function () {
        var q = $q.defer();
        $http.get(baseUrl + 'posts/').success(function (res) {
          q.resolve(res);
        });
        return q.promise;
      },

      // Get Post by ID
      getPost: function () {
        var q = $q.defer();
        $http.get(baseUrl + 'posts/?filter[name]=' + $routeParams.slug).success(function(res) {
          q.resolve(res);
        });
        return q.promise;
      }
    };
	}]);
