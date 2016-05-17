angular.module('tfApp').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/menu/:id?/', { templateUrl: 'pages/menu.html', controller: 'menuController', reloadOnSearch: false });
    $routeProvider.when('/orders/', { templateUrl: 'pages/orders/ordersList.html', controller: 'ordersListController', reloadOnSearch: false });
    $routeProvider.when('/order/:id/', { templateUrl: 'pages/orders/ordersForm.html', controller: 'ordersFormController', reloadOnSearch: false });
    $routeProvider.otherwise('/menu/');
}])

.constant('backendProperties', {
    productsCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Products",
    orderLinesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/OrderLines",
    ordersCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Orders",
    categoriesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Categories",
    rootCategory: "MENU"
})

.filter('currency', function () { // может в отдельный файл?
    return function (number, currencyCode) {
        var currency = {
            USD: "$",
            GBP: "£", //"<i class='fa fa-gbp' aria-hidden='true'></i>"
            AUD: "$",
            EUR: "€",
            CAD: "$",
            MIXED: "~"
        },
        thousand, decimal, format;
        if ($.inArray(currencyCode, ["USD", "AUD", "CAD", "MIXED"]) >= 0) {
            thousand = ",";
            decimal = ".";
            format = "%s%v";
        } else {
            thousand = ".";
            decimal = ",";
            format = "%s%v";
        };
        return accounting.formatMoney(number, currency[currencyCode], 2, thousand, decimal, format);
    };
});
