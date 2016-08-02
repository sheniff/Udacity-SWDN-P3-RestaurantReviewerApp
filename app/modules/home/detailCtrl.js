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

		vm.saveReview = function(rating, comment) {
			vm.restaurant.reviews.splice(0, 0, {
				restaurantId: vm.restaurant.id,
				reviewer: 'Snoopy',
				avatar: 'http://www.emoticonswallpapers.com/avatar/comics/Woodstock--Snoopy.jpg',
				timestamp: new Date().getTime(),
				rating: angular.copy(rating),
				comment: angular.copy(comment)
			});

			vm.clearForm();
		};

		vm.clearForm = function() {
			vm.newReview = {
				rating: 3,
				comment: ''
			};
		};

		// init
		vm.clearForm();
	}

})();
