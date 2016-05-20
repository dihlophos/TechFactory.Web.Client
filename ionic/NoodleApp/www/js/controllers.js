angular.module('starter.controllers', [])

.factory('categoriesFactory', function ($http, backendProperties) {

    var categoriesCollectionUrl = backendProperties.categoriesCollectionUrl;
   
    function get(query) {
        return $http.get(categoriesCollectionUrl + query.getQuery());
    };

    function save(category) {
        return $http.post(categoriesCollectionUrl, category);
    };

    return { get: get, save: save };
})

.factory('productsFactory', function ($http, backendProperties) {

    var productsCollectionUrl = backendProperties.productsCollectionUrl;

    function get(query) {
        return $http.get(productsCollectionUrl + query.getQuery());
    };

    function save(product) {
        return $http.post(productsCollectionUrl, product);
    };

    return {
        get: get,
        save: save
    };
})

.factory('ordersFactory', function ($http, backendProperties) {

    var orderLinesCollectionUrl = backendProperties.orderLinesCollectionUrl;
    var ordersCollectionUrl = backendProperties.ordersCollectionUrl;

    var _draft;

    function setDraft(draft) {
        _draft = draft;
    }

    function getDraft() {
        return _draft;
    }

    function get(query) {
        return $http.get(ordersCollectionUrl + query.getQuery());
    };

    function confirm(order) {
        order.StatusCode = "NEXTSTATUS";
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
        confirm: confirm,
        getDraft: getDraft,
        setDraft: setDraft
    };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('CategoryCtrl', function ($scope, $state, $stateParams, categoriesFactory, productsFactory, ordersFactory, backendProperties) {

    $scope.updateOrderLine = updateOrderLine;
    $scope.incPosition = incPosition;
    $scope.decPosition = decPosition;
    $scope.draft = getDraft();

    updateScope();
    updateProductScope();

    function updateScope() {

        if (!$stateParams.id) {
            categoriesFactory
                .get(new odataQuery()
                .filter("Key eq '" + backendProperties.rootCategory + "'")).then(function (answer) {
                    $state.go('app.categories', { 'id': answer.data.value[0].Id });
                });
        };

        if ($stateParams.id) {
            categoriesFactory
                .get(new odataQuery()
                .expand("Links")
                .filter("ParentId eq " + $stateParams.id))
                .then(function (answer) {
                    $scope.categories = answer.data.value;
                }, onError);
        }
    };



    function updateProductScope() {

        if (!$stateParams.id) {
            return;
        }

        productsFactory.get(new odataQuery()
            .filter("Categories/any(d:d/Id eq " + $stateParams.id + ")")
            .expand("Price,Categories,Links,Ingredients($expand=Child,ChildUom)")).then(function (answer) {
                var products = answer.data.value;

                ordersFactory.get(new odataQuery()
                    .filter("StatusCode eq 'DRAFT'")
                    .top(1)
                    .expand("Lines($expand=Item)")).then(function (answer) {
                        if (answer.data.value[0]) {
                            $scope.order = answer.data.value[0];
                            $scope.basket = generateBasket(products, $scope.order);

                            ordersFactory.setDraft($scope.order);
                            $scope.$emit('DRAFT_ORDER_ID', $scope.order.Id);
                        } else {
                            ordersFactory.save(getEmptyOrder()).then(function (answer) {
                                $scope.order = answer.data;
                                $scope.basket = generateBasket(products, $scope.order);

                                ordersFactory.setDraft($scope.order);
                                $scope.$emit('DRAFT_ORDER_ID', $scope.order.Id);
                            }, onError);
                        };
                    }, onError);
            }, onError);
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };

    function mapOrderToProducts(products, order) {
        return products.map(function (product) {
            var orderLine = findOrderLineByItemId(order.Lines, product.Id);

            product["orderLine"] = orderLine ?
                orderLine : getEmptyOrderLine(product.Id, order.Id);

            product["incControlEnabled"] = true;
            product["decControlEnabled"] = true;
            return product;
        });
    };

    function generateBasket(products, order) {
        var basket = {};
        basket["products"] = mapOrderToProducts(products, order);
        basket["pickedCount"] = 0;

        for (var line in order.Lines) {
            basket["pickedCount"] += order.Lines[line].Qty;
        }

        return basket;
    };

    function getEmptyOrderLine(productId, orderId) {
        return {
            Qty: 0,
            ItemId: productId,
            OrderId: orderId,
        };
    };

    function incPosition(product) {
        $scope.basket.pickedCount++;
        product.orderLine.Qty++;
        product.incControlEnabled = false;
        updateOrderLine(product);
    };

    function decPosition(product) {
        $scope.basket.pickedCount--;
        product.orderLine.Qty--;
        product.decControlEnabled = false;
        updateOrderLine(product);
    };

    function updateOrderLine(product) {
        product.controlEnabled = false;
        if (product.orderLine.Qty == 0) {
            ordersFactory.deleteOrderLine(product.orderLine.Id).then(function (answer) {
                product.orderLine = getEmptyOrderLine(product.Id, $scope.order.Id);
                product.incControlEnabled = true;
                product.decControlEnabled = true;

                ordersFactory.get(new odataQuery($scope.order.Id)).then(function (answer) {
                    ordersFactory.setDraft(answer.data);
                    $scope.$emit('DRAFT_ORDER_ID', answer.data.Id);
                }, onError);

            }, onError);
        }
        else {
            ordersFactory.saveOrderLine(product.orderLine).then(function (answer) {
                if (answer.data)//PUT returns status 204((
                {
                    product.orderLine = answer.data;
                };
                product.incControlEnabled = true;
                product.decControlEnabled = true;

                ordersFactory.get(new odataQuery($scope.order.Id)).then(function (answer) {
                    ordersFactory.setDraft(answer.data);
                    $scope.$emit('DRAFT_ORDER_ID', answer.data.Id);
                }, onError);

            }, onError);
        }
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
        product.incControlEnabled = true;
        product.decControlEnabled = true;
    };

    function getEmptyOrder() {
        return {
            Date: new Date().toISOString(),
            DueDate: new Date().toISOString(),
            Number: "SO001",
            Type: "SO"
        };
    };

    function findOrderLineByItemId(lines, itemId) {
        for (var line in lines) {
            if (lines[line].ItemId === itemId) {
                return lines[line];
            }
        }
        return null;
    };

    function getDraft() {
        return ordersFactory.getDraft();
    }
})

.controller('ProductCtrl', function (productsFactory, ordersFactory) {

    function controller($filter, $scope, $routeParams) {

    };

})

.controller('OrderCtrl', function ($scope, $stateParams, ordersFactory) {

    updateScope();
    $scope.confirm = confirm;

    function updateScope() {
        ordersFactory.get(new odataQuery($stateParams.id)
            .expand("Lines($expand = Item)"))
            .then(function (answer) {
                $scope.order = answer.data;
            }, onError);
    };

    function confirm() {
        ordersFactory.confirm($scope.order)
            .then(function (answer) {
                location.href = "#/orders/"
            }, onError);
    }

    $scope.removeOrderLine = function (line) {
        ordersFactory.deleteOrderLine(line.Id).then(function (answer) {
            updateScope();
            $scope.$emit('DRAFT_ORDER_ID', $scope.order.Id);
        }, onError);
    };

    function onError(answer) {
        alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
    };
})

.directive('basketButton', function (ordersFactory) {

    console.debug(Date() + ' step 1');

    function controller($filter, $scope, $stateParams, $timeout) {

        console.debug(Date() + ' step 2');

        $scope.$parent.$on('DRAFT_ORDER_ID', function (e, data) {

            var draft = ordersFactory.getDraft();

            if ($scope.amount != draft.Amount || $scope.orderId != draft.Id) {
                $scope.amount = draft.Amount;
                $scope.orderId = draft.Id;

                $scope.aclass = "bounceIn";

                $timeout(function () {
                    $scope.aclass = false;
                }, 500, true);

            }
        });

        function onError(answer) {
            alert("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
        };
    }

    return {
        restrict: "E",
        templateUrl: "templates/basket.button.template.html",
        controller: controller
    };
});