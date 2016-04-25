angular.module('tfApp').factory('productsFactory', function ($http) {

    var productsCollectionUrl = "http://partner-dev-srv.cloudapp.net/v1/odata/Products";

    function get() {
        return $http.get(productsCollectionUrl);
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return { get: get, save: save };
});