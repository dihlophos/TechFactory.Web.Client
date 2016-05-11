angular.module('tfApp').factory('productsFactory', function ($http, backendProperties) {

     var productsCollectionUrl = backendProperties.productsCollectionUrl;

    function get(query) {
        return $http.get(productsCollectionUrl + query.getQuery());
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return { get: get, save: save };
});
