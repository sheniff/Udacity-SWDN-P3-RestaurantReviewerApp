'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('restaurant-reviewer')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.detail', {
				url:'/:id',
				templateUrl: 'app/modules/home/detail.html',
				controller: 'DetailCtrl',
				controllerAs: 'vm'
			});

	}]);
