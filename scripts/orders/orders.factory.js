angular.module('tfApp').factory('ordersFactory', function ($http) {

    var orderLinesCollectionUrl = "http://partner-dev-srv.cloudapp.net/v1/odata/OrderLines";
    var ordersCollectionUrl = "http://partner-dev-srv.cloudapp.net/v1/odata/Orders";

    function get() {
        return $http.get(ordersCollectionUrl);
    };

    function getById(id) {
        return $http.get(ordersCollectionUrl + '(' + id + ')');
    };

    function save(order) {
        if (order.Id) {
            return $http.put(ordersCollectionUrl + '(' + order.Id + ')', order);
        }
        else {
            return $http.post(ordersCollectionUrl, order);
        }
    };

    function getOrderLines(orderId) {
        return $http.get(ordersCollectionUrl + '(' + orderId + ')/Lines');
    };

    function getItem(orderLineId) {
        return $http.get(orderLinesCollectionUrl + '(' + orderLineId + ')/Item');
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
        getById: getById,
        save: save,
        saveOrderLine: saveOrderLine,
        deleteOrderLine: deleteOrderLine,
        getOrderLines: getOrderLines,
        getItem: getItem
    };
});