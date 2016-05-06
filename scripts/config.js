angular.module('tfApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'pages/categories/categoriesList.html', controller: 'categoriesListController', reloadOnSearch: false });
  $routeProvider.when('/categories/:id/', { templateUrl: 'pages/categories/categoriesList.html', controller: 'categoriesListController', reloadOnSearch: false });
  $routeProvider.when('/products/:catid/', { templateUrl: 'pages/products/productsList.html', controller: 'productsListController', reloadOnSearch: false });
  $routeProvider.when('/orders/', { templateUrl: 'pages/orders/ordersList.html', controller: 'ordersListController', reloadOnSearch: false });
  $routeProvider.when('/order/:id/', { templateUrl: 'pages/orders/ordersForm.html', controller: 'ordersFormController', reloadOnSearch: false });
  $routeProvider.otherwise('/');
}])

.constant('backendProperties', {
    productsCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Products",
    orderLinesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/OrderLines",
    ordersCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Orders",
    categoriesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Categories",
    rootCategory: "MENU"
});
