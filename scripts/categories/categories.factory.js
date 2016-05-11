angular.module('tfApp').factory('categoriesFactory', function ($http, backendProperties) {

    var categoriesCollectionUrl = backendProperties.categoriesCollectionUrl;
   
    function get(query) {
        return $http.get(categoriesCollectionUrl + query.getQuery());
    };

    function save(category) {
        return $http.post(categoriesCollectionUrl, category);
    };

    return { get: get, save: save };
});
