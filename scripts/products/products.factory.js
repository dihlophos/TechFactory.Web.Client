angular.module('tfApp').factory('productsFactory', function ($http, backendProperties) {

     var productsCollectionUrl = backendProperties.productsCollectionUrl;

    function get() {
        return $http.get(productsCollectionUrl);
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return { get: get, save: save };
});
