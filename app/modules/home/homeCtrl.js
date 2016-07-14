(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('restaurant-reviewer')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', '$scope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.restaurants = homeService.getRestaurants();

		$scope.$on('filterRestaurants', function(event, data) {
			console.log('filtering restaurants...', data);
			vm.restaurants = homeService.getRestaurants(data);
		});
	}

})();
