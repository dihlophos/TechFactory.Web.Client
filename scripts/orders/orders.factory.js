angular.module('tfApp').factory('ordersFactory', function ($http, backendProperties) {

    var orderLinesCollectionUrl = backendProperties.orderLinesCollectionUrl;
    var ordersCollectionUrl = backendProperties.ordersCollectionUrl;

    function get(query) {
        return $http.get(ordersCollectionUrl + query.getQuery());
    };

    function confirm(order) {
        order.StatusCode = "NEW";
        return save(order);
    };

    function save(order) {
        if (order.Id) {
            return $http.put(ordersCollectionUrl + '(' + order.Id + ')', order);
        }
        else {
            return $http.post(ordersCollectionUrl, order);
        }
    };

    function saveOrderLine(orderLine) {
        if (orderLine.Id) {
            return $http.put(orderLinesCollectionUrl + '(' + orderLine.Id + ')', orderLine);
        }
        else {
            return $http.post(orderLinesCollectionUrl, orderLine);
        }
    };

    function deleteOrderLine(id) {
        return $http.delete(orderLinesCollectionUrl + '(' + id + ')');
    };

    return {
        get: get,
        save: save,
        saveOrderLine: saveOrderLine,
        deleteOrderLine: deleteOrderLine,
        confirm: confirm
    };
});
