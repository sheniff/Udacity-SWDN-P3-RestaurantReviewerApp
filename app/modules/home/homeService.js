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
			{ id: 1, name: 'Umami burger', picture: 'https://s3-media2.fl.yelpcdn.com/bphoto/jeUaPl9fk6v4V_CksHAV_w/ls.jpg', address: '242 King Street San Francisco, CA 94107', type: ['Burgers', 'American (New)', 'Gastropubs'], hours: { open: 1100, close: 2300, text: '11:00 am - 11:00 pm' } },
			{ id: 2, name: 'Kazan', picture: 'http://s3-media2.fl.yelpcdn.com/bphoto/8HlfX05Vg9fHs73ySDBdZA/ls.jpg', address: '2809 24th St San Francisco, CA 94110', type: ['Japanese', 'Sushi bars'], hours: { open: 1100, close: 2300, text: '11:00 am - 11:00 pm' } },
			{ id: 3, name: 'El burrito express', picture: 'http://s3-media1.fl.yelpcdn.com/bphoto/gxLv13cu1O9NWPKy66vLtg/ls.jpg', address: '1601 Taraval St San Francisco, CA 94116', type: ['Mexican'], hours: { open: 1100, close: 2300, text: '11:00 am - 11:00 pm' } },
			{ id: 4, name: 'Lightning Tavern', picture: 'http://s3-media3.fl.yelpcdn.com/bphoto/SSbrzD-aFaTHLKOFG_f2BQ/ls.jpg', address: '1875 Union St San Francisco, CA 94123', type: ['Bars', 'American (New)'], hours: { open: 1100, close: 2300, text: '11:00 am - 11:00 pm' } }
		];

		var reviews = [
			{ restaurantId: 1, reviewer: 'John Snow', avatar: 'https://thoughtcatalog.files.wordpress.com/2016/04/jon-snow.jpg', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
			{ restaurantId: 1, reviewer: 'John Snow', avatar: 'https://thoughtcatalog.files.wordpress.com/2016/04/jon-snow.jpg', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
			{ restaurantId: 2, reviewer: 'John Snow', avatar: 'https://thoughtcatalog.files.wordpress.com/2016/04/jon-snow.jpg', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
			{ restaurantId: 3, reviewer: 'John Snow', avatar: 'https://thoughtcatalog.files.wordpress.com/2016/04/jon-snow.jpg', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
		];

		var types = Object.keys(restaurants.reduce(function(types, r) {
			for (var i in r.type) {
				types[r.type[i]] = true;
			}
			return types;
		}, {}));

		return {
			getRestaurants: getRestaurants,
			getRestaurant: getRestaurant,
			queryTypes: queryTypes
		};

		function getRestaurants(filter) {
			var res = restaurants;

			if (angular.isObject(filter)) {
				res = res.filter(function(r) {
					var valid = true;

					if (filter.name) {
						valid = (r.name.indexOf(filter.name) !== -1);
					}

					if (valid && filter.address) {
						valid = (r.address.indexOf(filter.address) !== -1);
					}

					if (valid && filter.open) {
						var now = new Date();
						now = now.getHours() * 100 + now.getMinutes();
						valid = (now >= r.hours.open && now < r.hours.close);
					}

					if (valid && filter.type) {
						valid = r.types.includes(filter.type);
					}

					return valid;
				});
			}

			return res;
		}

		function getRestaurant(id) {
			var res = restaurants.find(function(r) { return r.id === parseInt(id, 10); });

			if (res) {
				res.reviews = reviews.filter(function(r) { return r.restaurantId === parseInt(id, 10); });
			}

			return res;
		}

		function queryTypes(q) {
			return types.filter(function(t) {
				return t.indexOf(q) !== -1;
			});
		}
	}

})();
