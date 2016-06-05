(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('restaurant-reviewer')
		.factory('homeService', homeService);

	homeService.$inject = ['$http'];

	function homeService($http) {

		var restaurants = [
			{ name: 'Umami burger', picture: 'https://s3-media2.fl.yelpcdn.com/bphoto/jeUaPl9fk6v4V_CksHAV_w/ls.jpg', address: '242 King Street San Francisco, CA 94107', type: [' Burgers', 'American (New)', 'Gastropubs'], hours: '11:00 am - 11:00 pm' },
			{ name: 'Umami burger', picture: 'https://s3-media2.fl.yelpcdn.com/bphoto/jeUaPl9fk6v4V_CksHAV_w/ls.jpg', address: '242 King Street San Francisco, CA 94107', type: [' Burgers', 'American (New)', 'Gastropubs'], hours: '11:00 am - 11:00 pm' },
			{ name: 'Umami burger', picture: 'https://s3-media2.fl.yelpcdn.com/bphoto/jeUaPl9fk6v4V_CksHAV_w/ls.jpg', address: '242 King Street San Francisco, CA 94107', type: [' Burgers', 'American (New)', 'Gastropubs'], hours: '11:00 am - 11:00 pm' },
			{ name: 'Umami burger', picture: 'https://s3-media2.fl.yelpcdn.com/bphoto/jeUaPl9fk6v4V_CksHAV_w/ls.jpg', address: '242 King Street San Francisco, CA 94107', type: [' Burgers', 'American (New)', 'Gastropubs'], hours: '11:00 am - 11:00 pm' }
		];

		return {
			getRestaurants: getRestaurants
		};

		function getRestaurants() {
			return restaurants;
		}
	}

})();
