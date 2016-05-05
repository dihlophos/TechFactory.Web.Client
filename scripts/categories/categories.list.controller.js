angular.module('tfApp').controller('categoriesListController', function ($scope, $routeParams, categoriesFactory) {

    updateScope();

    function updateScope() {
        if ($routeParams.id) {
            categoriesFactory.getChildren($routeParams.id)
                .then(function (answer) {
                    $scope.categories = answer.data.value;
                    if (!$scope.categories.length) {
                        location.href = "#/products/" + $routeParams.id + "/"; //TODO: сделаем нормально, когда обработаем продукты и категории в одной куче
                    };
                }, onError);
        } else {
            categoriesFactory.get()
                .then(function (answer) {
                    $scope.categories = answer.data.value;
                }, onError);
        }
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});
