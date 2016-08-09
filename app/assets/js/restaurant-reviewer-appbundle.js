/*!
* restaurant-reviewer - v0.0.1 - MIT LICENSE 2016-08-08. 
* @author Sheniff
*/
(function() {
	'use strict';

	/**
	* @ngdoc index
	* @name app
	* @description
	* # app
	*
	* Main module of the application.
	*/

	angular.module('restaurant-reviewer', [
		'ngResource',
		'ngAria',
		 'ngMaterial',
		'ngMdIcons',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'home',
	]);

})();

(function () {
	'use strict';

	/**
	* @ngdoc configuration file
	* @name app.config:config
	* @description
	* # Config and run block
	* Configutation of the app
	*/


	angular
		.module('restaurant-reviewer')
		.config(configure);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		$urlRouterProvider.otherwise('/dashboard');
	}
})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

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
				reviewer: 'Snoopy',
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
			vm.newReview.comment = '';
		};

		// init
		vm.clearForm();
	}

})();

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

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('restaurant-reviewer')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;
		var focusedElementBeforeModal;

		vm.toggleSidenav = function (menuId) {
			var sidenav = $mdSidenav(menuId);
			sidenav.toggle().then(function() {
				if (sidenav.isOpen()) {
					lockFocus();
				} else {
					unlockFocus();
				}
			});
		};

		vm.inDashboard = function() {
			return $state.current.name === 'home.dashboard';
		};

		var lockFocus = function() {
			focusedElementBeforeModal = document.activeElement;
			var modal = document.querySelector('form[name="filterForm"]');

			modal.addEventListener('keydown', trapTabKey);

			var focusableElementsString = 'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
			var focusableElements = modal.querySelectorAll(focusableElementsString);
			focusableElements = Array.prototype.slice.call(focusableElements);
			var firstTabStop = focusableElements[0];
			var lastTabStop = focusableElements[focusableElements.length - 1];

			// focus first child
			firstTabStop.focus();

			// tab trap
			function trapTabKey(e) {
				if (e.keyCode === 9) {
					// shift + tab
					if (e.shiftKey) {
						if (document.activeElement === firstTabStop) {
							e.preventDefault();
							lastTabStop.focus();
						}

					// tab
					} else {
						if (document.activeElement === lastTabStop) {
							e.preventDefault();
							firstTabStop.focus();
						}
					}
				}
			}
		};

		var unlockFocus = function() {
			focusedElementBeforeModal.focus();
		};
	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	angular
		.module('restaurant-reviewer')
		.controller('SidenavCtrl', SidenavCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', '$scope', 'homeService', '$rootScope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, $scope, homeService, $rootScope) {
		/*jshint validthis: true */
		var sidenav = this,
			newFilter = function() {
				return {
					name: '',
					address: '',
					open: false,
					type: ''
				};
			};

		// filter form
		sidenav.filter = newFilter();

		sidenav.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		sidenav.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', sidenav.closeSidenav);

		sidenav.navigateTo = function (target) {
			var page = target;
			$state.go(page);
		};

		sidenav.queryTypes = function(q) {
			return (q ? homeService.queryTypes(q) : []);
		};

		sidenav.filterRestaurants = function() {
			$rootScope.$broadcast('filterRestaurants', angular.copy(sidenav.filter));
			sidenav.closeSidenav();
		};

		sidenav.clearForm = function() {
			sidenav.filter = newFilter();
			$rootScope.$broadcast('filterRestaurants', angular.copy(sidenav.filter));
		};
	}

})();

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
			{ restaurantId: 1, reviewer: 'Jon Snow', avatar: 'http://65.media.tumblr.com/avatar_91989eab746d_96.png', timestamp: 1465446295139, rating: 2, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
			{ restaurantId: 1, reviewer: 'Nyan Cat', avatar: 'http://www.avatarsdb.com/avatars/Nyan_Cat_Fever.gif', timestamp: 1465446295139, rating: 5, comment: 'Cat ipsum dolor sit amet, unwrap toilet paper knock dish off table head butt cant eat out of my own dish and knock dish off table head butt cant eat out of my own dish. Flop over eat from dog\'s food lounge in doorway sit on the laptop. Meowzer! present belly, scratch hand when stroked yet cats go for world domination or white cat sleeps on a black shirt or soft kitty warm kitty little ball of furr or jump off balcony, onto stranger\'s head.' },
			{ restaurantId: 2, reviewer: 'Jon Snow', avatar: 'http://65.media.tumblr.com/avatar_91989eab746d_96.png', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
			{ restaurantId: 3, reviewer: 'Jon Snow', avatar: 'http://65.media.tumblr.com/avatar_91989eab746d_96.png', timestamp: 1465446295139, rating: 3, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
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
