angular.module('tfManagerApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/main/', { templateUrl: 'main.html', controller: 'mainController', reloadOnSearch: false });
  $routeProvider.when('/', { templateUrl: 'main.html', controller: 'mainController', reloadOnSearch: false });
}])

.constant('backendProperties', {
    productsCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Products",
    orderLinesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/OrderLines",
    ordersCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Orders",
    categoriesCollectionUrl: "http://partner-web-api-v1.azurewebsites.net/odata/Categories",
    rootCategory: "MENU"
})

.filter('currency', function () {
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
