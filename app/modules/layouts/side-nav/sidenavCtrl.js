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
