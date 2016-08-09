/*!
* restaurant-reviewer - v0.0.5 - MIT LICENSE 2016-08-09. 
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

angular.module('restaurant-reviewer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/dashboard.html',
    "<md-content layout=\"row\" layout-wrap style=\"background-color:#DCDCDC\">\n" +
    "\n" +
    "    <md-card ng-repeat=\"res in vm.restaurants\" flex=\"100\" flex-gt-xs=\"45\" flex-gt-sm=\"30\">\n" +
    "        <img ng-src=\"{{ res.picture }}\" alt=\"{{ res.name }}\" class=\"md-card-image\">\n" +
    "        <md-card-title>\n" +
    "          <md-card-title-text>\n" +
    "            <span class=\"md-headline\">{{ res.name }}</span>\n" +
    "            <small>{{ res.type.join(', ') }}</small>\n" +
    "          </md-card-title-text>\n" +
    "        </md-card-title>\n" +
    "        <md-card-content>\n" +
    "            <p>\n" +
    "                <strong>{{ res.address }}</strong>\n" +
    "                <br>\n" +
    "                <span>{{ res.hours.text }}</span>\n" +
    "            </p>\n" +
    "        </md-card-content>\n" +
    "        <md-card-actions layout=\"column\" layout-align=\"start\">\n" +
    "          <md-button class=\"md-raised\" ui-sref=\"home.detail({ id: res.id })\">View</md-button>\n" +
    "        </md-card-actions>\n" +
    "    </md-card>\n" +
    "\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/home/detail.html',
    "<md-content layout=\"row\" layout-wrap style=\"background-color:#DCDCDC\">\n" +
    "    <div flex=\"100\" flex-gt-xs=\"45\" layout=\"column\">\n" +
    "        <md-card>\n" +
    "            <img ng-src=\"{{ vm.restaurant.picture }}\" alt=\"{{ vm.restaurant.name }}\" class=\"md-card-image\">\n" +
    "            <md-card-title>\n" +
    "              <md-card-title-text>\n" +
    "                <h2 class=\"md-headline\">{{ vm.restaurant.name }}</h2>\n" +
    "                <small>{{ vm.restaurant.type.join(', ') }}</small>\n" +
    "              </md-card-title-text>\n" +
    "            </md-card-title>\n" +
    "            <md-card-content>\n" +
    "                <p>\n" +
    "                    <strong>{{ vm.restaurant.address }}</strong>\n" +
    "                    <br>\n" +
    "                    <span>{{ vm.restaurant.hours.text }}</span>\n" +
    "                </p>\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "\n" +
    "        <md-card>\n" +
    "            <md-card-title>\n" +
    "              <md-card-title-text>\n" +
    "                <h2 class=\"md-headline\">Leave a review\n" +
    "                <br>\n" +
    "                <small>for {{ vm.restaurant.name }}</small></h2>\n" +
    "              </md-card-title-text>\n" +
    "            </md-card-title>\n" +
    "            <md-card-content>\n" +
    "\n" +
    "                <form name=\"reviewForm\" ng-submit=\"vm.saveReview(vm.newReview.rating, vm.newReview.comment)\" novalidate>\n" +
    "                    <md-input-container class=\"md-block\" md-is-error=\"vm.reviewForm.$submitted && vm.reviewForm.name.$invalid\">\n" +
    "                        <label>Name (required)</label>\n" +
    "                        <input type=\"text\" name=\"name\" id=\"name\" ng-model=\"vm.newReview.name\" required/>\n" +
    "                        <div ng-messages=\"vm.reviewForm.name.$error\" ng-if=\"vm.reviewForm.$submitted && vm.reviewForm.name.$invalid\">\n" +
    "                          <p ng-message=\"required\">Name is required.</p>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                    <!-- ToDo: Reescribir este componente para escoger estrellitas :P (un selector sería lo mas facil) -->\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <label>Rating</label>\n" +
    "                        <input type=\"number\" max=\"5\" min=\"1\" name=\"rating\" id=\"rating\" ng-model=\"vm.newReview.rating\">\n" +
    "                        <div ng-messages=\"vm.reviewForm.rating.$error\">\n" +
    "                          <p ng-message=\"required\">Rating is required.</p>\n" +
    "                          <p ng-message=\"max\">The maximum rating is 5 stars.</p>\n" +
    "                          <p ng-message=\"min\">The minimum rating is 1 star.</p>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                    <md-input-container class=\"md-block\" md-is-error=\"vm.reviewForm.$submitted && vm.reviewForm.comment.$invalid\">\n" +
    "                        <label>Comment (required)</label>\n" +
    "                        <textarea name=\"comment\" id=\"comment\" ng-model=\"vm.newReview.comment\" required></textarea>\n" +
    "                        <div ng-messages=\"vm.reviewForm.comment.$error\" ng-if=\"vm.reviewForm.$submitted && vm.reviewForm.comment.$invalid\">\n" +
    "                          <p ng-message=\"required\">Comment is required.</p>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                    <md-button type=\"submit\" class=\"md-primary md-raised\" aria-label=\"Send\" ng-disabled=\"reviewForm.$invalid\">Send</md-button>\n" +
    "                    <md-button aria-label=\"Cancel\" ng-click=\"vm.clearForm()\">Clear</md-button>\n" +
    "                </form>\n" +
    "\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "\n" +
    "    <div flex=\"100\" flex-gt-xs=\"50\" layout=\"column\">\n" +
    "        <md-card flex>\n" +
    "            <md-card-title style=\"flex-grow: 0.15\">\n" +
    "              <md-card-title-text>\n" +
    "                <h2 class=\"md-headline reviews-title\" tabindex=\"-1\">Reviews</h2>\n" +
    "              </md-card-title-text>\n" +
    "            </md-card-title>\n" +
    "            <md-card-content>\n" +
    "                <md-list flex>\n" +
    "                    <md-list-item class=\"md-3-line\" ng-repeat=\"review in vm.restaurant.reviews\">\n" +
    "                        <div class=\"md-list-item-text\" layout=\"column\" style=\"padding-top: 10px; padding-bottom: 10px;\">\n" +
    "                            <div layout=\"row\">\n" +
    "                                <img ng-src=\"{{review.avatar}}\" class=\"md-avatar\" alt=\"{{review.reviewer}} avatar\" />\n" +
    "                                <div layout=\"column\">\n" +
    "                                    <h3>{{ review.reviewer }}</h3>\n" +
    "                                    <h4>\n" +
    "                                    <span aria-label=\"Rating\">\n" +
    "                                        <ng-md-icon ng-repeat=\"a in vm.getNumber(review.rating) track by $index\" icon=\"star\"></ng-md-icon>\n" +
    "                                    </span>\n" +
    "                                    <small>{{ review.timestamp | date }}</small></h4>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <p>{{ review.comment }}</p>\n" +
    "                        </div>\n" +
    "                        <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "                    </md-list-item>\n" +
    "                </md-list>\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "    <aside ng-controller=\"SidenavCtrl as sidenav\" ng-cloak>\n" +
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "                        <h2 class=\"cleanup-text\"><ng-md-icon icon=\"search\"></ng-md-icon> Filter results</h2>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <form name=\"filterForm\" class=\"md-padding\" ng-submit=\"sidenav.filterRestaurants()\">\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <label>Local name</label>\n" +
    "                <input name=\"name\" ng-model=\"sidenav.filter.name\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <label>Address</label>\n" +
    "                <input name=\"address\" ng-model=\"sidenav.filter.address\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <md-checkbox ng-model=\"sidenav.filter.open\">\n" +
    "                Open now\n" +
    "            </md-checkbox>\n" +
    "\n" +
    "            <md-input-container class=\"md-block\">\n" +
    "                <label>Type of restaurant</label>\n" +
    "                <input name=\"type\" ng-model=\"sidenav.filter.type\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "            <md-button type=\"submit\" class=\"md-primary md-raised\" aria-label=\"Filter\">Filter</md-button>\n" +
    "        </form>\n" +
    "    </aside>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "    <md-toolbar ng-show=\"!showSearch\">\n" +
    "        <header class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"search\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <md-button ng-if=\"!layout.inDashboard()\" ui-sref=\"home.dashboard\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h1>Restaurant Reviewer</h1>\n" +
    "        </header>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "    <main ui-view></main>\n" +
    "</div>\n"
  );

}]);
