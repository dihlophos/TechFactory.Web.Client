angular.module('tfManagerApp').factory('categoriesFactory', function ($http, backendProperties) {

    var categoriesCollectionUrl = backendProperties.categoriesCollectionUrl;

    function get() {
        return $http.get(categoriesCollectionUrl);
    };

    function getChildren(id) {
        return $http.get(categoriesCollectionUrl + "?$filter=ParentId eq " + id);
    };

    function del(id) {
        return $http.delete(categoriesCollectionUrl  + "(" + id + ")");
    }

    function save(category) {
        if (category.Id) {
            return $http.put(categoriesCollectionUrl + "(" + category.Id + ")", category);
        } else {
            return $http.post(categoriesCollectionUrl, category);
        }
    };

    return { get: get, save: save, getChildren: getChildren, del: del };
});
