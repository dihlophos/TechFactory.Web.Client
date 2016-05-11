angular.module('tfApp').controller('ordersListController', function (ordersFactory, $scope) {

    $scope.formatDate = formatDate;

    updateScope();

    function updateScope() {
        ordersFactory.get()
            .then(function (answer) {
                $scope.orders = answer.data.value;
            }, onError);
    };

    function formatDate(date) {
        return new Date(date).toString('f');
    }


    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
});