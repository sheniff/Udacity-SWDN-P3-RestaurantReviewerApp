(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:DetailCtrl
	* @description
	* # DetailCtrl
	* Controller of the app
	*/

	angular
		.module('restaurant-reviewer')
		.controller('DetailCtrl', Detail);

	Detail.$inject = ['$state', 'homeService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Detail($state, homeService) {
		/*jshint validthis: true */
		var vm = this;

		vm.restaurant = homeService.getRestaurant($state.params.id);
		vm.getNumber = function(num) {
			return new Array(num);
		};
	}

})();
