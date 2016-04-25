angular.module('tfApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'pages/productsList.html',
            controller: 'productsListController'
        }).
        when('/products', {
            templateUrl: 'pages/productsList.html',
            controller: 'productsListController'
        }).
        when('/orders', {
            templateUrl: 'pages/ordersList.html',
            controller: 'ordersListController'
        }).
        when('/order/:id', {
            templateUrl: 'pages/ordersForm.html',
            controller: 'ordersFormController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);