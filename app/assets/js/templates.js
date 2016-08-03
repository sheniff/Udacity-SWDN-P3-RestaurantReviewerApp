angular.module('restaurant-reviewer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/dashboard.html',
    "<md-content layout=\"row\" layout-wrap style=\"background-color:#DCDCDC\">\n" +
    "\n" +
    "    <md-card ng-repeat=\"res in vm.restaurants\" flex-xs flex-gt-xs=\"30\">\n" +
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
    "</md-content>\n" +
    "\n"
  );


  $templateCache.put('app/modules/home/detail.html',
    "<md-content layout=\"row\" layout-wrap style=\"background-color:#DCDCDC\">\n" +
    "    <div flex-md flex-gt-md=\"50\" layout=\"column\">\n" +
    "        <md-card>\n" +
    "            <div style=\"height: 200px;overflow: hidden\">\n" +
    "                <img style=\"transform: translateY(-220px)\" ng-src=\"{{ vm.restaurant.picture }}\" alt=\"{{ vm.restaurant.name }}\" class=\"md-card-image\">\n" +
    "            </div>\n" +
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
    "                    <!-- ToDo: Reescribir este componente para escoger estrellitas :P (un selector sería lo mas facil) -->\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <label>Rating</label>\n" +
    "                        <input type=\"number\" max=\"5\" min=\"1\" name=\"rating\" id=\"rating\" ng-model=\"vm.newReview.rating\">\n" +
    "                        <div ng-messages=\"reviewForm.rating.$error\">\n" +
    "                          <div ng-message=\"required\">Rating is required.</div>\n" +
    "                          <div ng-message=\"max\">The maximum rating is 5 stars.</div>\n" +
    "                          <div ng-message=\"min\">The minimum rating is 1 star.</div>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                        <label>Comment</label>\n" +
    "                        <textarea name=\"comment\" id=\"comment\" ng-model=\"vm.newReview.comment\" required></textarea>\n" +
    "                        <div ng-messages=\"reviewForm.comment.$error\">\n" +
    "                          <div ng-message=\"required\">Comment is required.</div>\n" +
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
    "    <div flex-md flex-gt-md=\"50\" layout=\"column\">\n" +
    "        <md-card flex>\n" +
    "            <md-card-title>\n" +
    "              <md-card-title-text>\n" +
    "                <h2 class=\"md-headline\">Reviews</h2>\n" +
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
    "                                    <span aria-label=\"Rating\" aria-value=\"{{review.rating}}\">\n" +
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
    "</md-content>\n" +
    "\n"
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
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
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
