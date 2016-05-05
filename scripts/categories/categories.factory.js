angular.module('tfApp').factory('categoriesFactory', function ($http, backendProperties) {

    var categoriesCollectionUrl = backendProperties.categoriesCollectionUrl;

    function get() {
        return $http.get(categoriesCollectionUrl + "?$filter=Key eq '" + backendProperties.rootCategory + "'");
    };

    function getChildren(id) {
        return $http.get(categoriesCollectionUrl + "?$filter=ParentId eq " + id);
    };

    function save(category) {
        return $http.post(categoriesCollectionUrl, category);
    };

    return { get: get, save: save, getChildren: getChildren };
});
