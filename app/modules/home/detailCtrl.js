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
		vm.newReview = {};

		vm.getNumber = function(num) {
			return new Array(num);
		};

		vm.saveReview = function(rating, comment) {
			vm.restaurant.reviews.splice(0, 0, {
				restaurantId: vm.restaurant.id,
				reviewer: vm.newReview.name,
				avatar: 'http://www.emoticonswallpapers.com/avatar/comics/Woodstock--Snoopy.jpg',
				timestamp: new Date().getTime(),
				rating: angular.copy(rating),
				comment: angular.copy(comment)
			});

			vm.clearForm();
			// focus on list of reviews to help screen reader to focus atention in what matters next
			document.querySelector('h2.reviews-title').focus();
		};

		vm.clearForm = function() {
			vm.newReview.rating = 3;
			vm.newReview.name = '';
			vm.newReview.comment = '';
		};

		// init
		vm.clearForm();
	}

})();
