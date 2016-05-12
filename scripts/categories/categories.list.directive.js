angular.module('tfApp').directive('categoriesList', function (categoriesFactory) {
    function controller($filter, $scope, $routeParams) {
        updateScope();        
        function updateScope() {
            if ($routeParams.id) {
                categoriesFactory.get(new odataQuery()
                    .filter("ParentId eq " + $routeParams.id)).then(function (answer) {
                        $scope.categories = answer.data.value;
                    }, onError);
            };
        };

        function onError(answer) {
            alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
        };
    }

    return {
        restrict:"E",
        templateUrl: "scripts/categories/categories.list.template.html",
        scope:{
            disabled:"="
        },
        controller:controller
    };
});

