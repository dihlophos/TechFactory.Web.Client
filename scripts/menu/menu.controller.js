angular.module('tfApp').controller('menuController', function (categoriesFactory, $routeParams, $scope) {
    if (!$routeParams.id) {
        categoriesFactory.get().then(function (answer) {
               location.href=location.href + answer.data.value[0].Id; // ну вот так пока...
            });
    };
});
