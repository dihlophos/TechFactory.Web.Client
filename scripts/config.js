angular.module('tfApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'pages/categories/categoriesList.html', controller: 'categoriesListController', reloadOnSearch: false });
  $routeProvider.when('/categories/:id/', { templateUrl: 'pages/categories/categoriesList.html', controller: 'categoriesListController', reloadOnSearch: false });
  $routeProvider.when('/products/:catid/', { templateUrl: 'pages/products/productsList.html', controller: 'productsListController', reloadOnSearch: false });
  $routeProvider.when('/orders/', { templateUrl: 'pages/orders/ordersList.html', controller: 'ordersListController', reloadOnSearch: false });
  $routeProvider.when('/order/:id/', { templateUrl: 'pages/orders/ordersForm.html', controller: 'ordersFormController', reloadOnSearch: false });
  $routeProvider.otherwise('/');
}])

.constant('backendProperties', {
    productsCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/Products",
    orderLinesCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/OrderLines",
    ordersCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/Orders",
    categoriesCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/Categories",
    rootCategory: "MENU"
});
