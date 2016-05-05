angular.module('tfApp').factory('productsFactory', function ($http, backendProperties) {

     var productsCollectionUrl = backendProperties.productsCollectionUrl;

    function get() {
        return $http.get(productsCollectionUrl + "/?$expand=Price");
    };

	function getByCategoryId(id) {
        return $http.get(productsCollectionUrl + "/?$expand=Price,Categories&$filter=Categories/any(d:d/Id eq " + id + ")");//это все очень плохо(
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return { get: get, save: save , getByCategoryId: getByCategoryId};
});
