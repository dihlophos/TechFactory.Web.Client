angular.module('tfApp').controller('categoriesListController', function ($scope, $routeParams, categoriesFactory) {

    updateScope();

    function updateScope() {
        console.log($routeParams.id);
        if ($routeParams.id) {
            categoriesFactory.getChildren($routeParams.id)
                .then(function (answer) {
                    $scope.categories = answer.data.value;
                    if (!$scope.categories.length) {
                        location.href = "#/products/" + $routeParams.id;
                    };
                }, onError);
        } else {
            categoriesFactory.get()
                .then(function (answer) {
                    $scope.categories = answer.data.value;
                    if (!$scope.categories.length) {
                        location.href = "#/products/" + $routeParams.id;
                    };
                }, onError);
        }
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});
