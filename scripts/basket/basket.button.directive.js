angular.module('tfApp').directive('basketButton', function (ordersFactory) {
    function controller($filter, $scope, $routeParams) {
        updateScope();
        function updateScope() {
            if ($routeParams.id) {
                ordersFactory.get(new odataQuery()
                    .id($routeParams.id)).then(function (answer) {
                        $scope.amount = answer.data.value.Amount;
                        $scope.orderId = answer.data.value.Id;
                    }, onError);
            } else {
                $scope.amount = 28;
                $scope.orderId = "f9de2b23-45e7-478f-bc88-c1ef538ff2f2";
            };
        };

        function onError(answer) {
            alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
        };
    }

    return {
        restrict:"E",
        templateUrl: "scripts/basket/basket.button.template.html",
        controller:controller
    };
});

