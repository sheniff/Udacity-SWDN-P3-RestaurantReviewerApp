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
