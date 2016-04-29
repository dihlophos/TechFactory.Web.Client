angular.module('tfApp').factory('productsFactory', function ($http) {

    var productsCollectionUrl = "http://partner-dev-srv.cloudapp.net/v1/odata/Products/?$expand=Price";

    function get() {
        return $http.get(productsCollectionUrl);
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return { get: get, save: save };
});