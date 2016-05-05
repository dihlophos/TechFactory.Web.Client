angular.module('tfApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {   templateUrl: 'pages/productsList.html', controller: 'productsListController', reloadOnSearch: false});
  $routeProvider.when('/products', {   templateUrl: 'pages/productsList.html', controller: 'productsListController', reloadOnSearch: false});
  $routeProvider.when('/orders', {   templateUrl: 'pages/ordersList.html', controller: 'ordersListController', reloadOnSearch: false});
  $routeProvider.when('/order/:id', {   templateUrl: 'pages/ordersForm.html', controller: 'ordersFormController', reloadOnSearch: false});
  $routeProvider.otherwise('/');
}])

.constant('backendProperties', {
    productsCollection: "http://partner-dev-srv.cloudapp.net/v1/odata/Products/?$expand=Price",
    orderLinesCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/OrderLines",
    ordersCollectionUrl: "http://partner-dev-srv.cloudapp.net/v1/odata/Orders"
});
