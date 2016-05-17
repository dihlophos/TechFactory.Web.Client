angular.module('tfApp').directive('basketButton', function (ordersFactory) {

    console.debug(Date() + ' step 1');

    function controller($filter, $scope, $routeParams) {

        console.debug(Date() + ' step 2');

        $scope.$on('DRAFT_ORDER_ID', function (e, data) {
            ordersFactory.get(new odataQuery(data))
                .then(function (answer) {
                    $scope.amount = answer.data.Amount;
                    $scope.orderId = data;
                }, onError);
        });

        function onError(answer) {
            alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
        };
    }

    return {
        restrict: "E",
        templateUrl: "scripts/basket/basket.button.template.html",
        controller: controller
    };
});

