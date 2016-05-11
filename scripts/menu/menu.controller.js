angular.module('tfApp').controller('menuController', function (categoriesFactory, $routeParams, $scope, backendProperties) {
    if (!$routeParams.id) {
        $scope.listsEnabled = true;
        categoriesFactory.get(new odataQuery()
            .filter("Key eq '" + backendProperties.rootCategory + "'")).then(function (answer) {
               location.href=location.href + answer.data.value[0].Id; // ну вот так пока...
            });
    };
});
