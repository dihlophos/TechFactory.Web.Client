(function(){

  angular
       .module('categories')
       .controller('CategoryController', [
          'categoryService', '$timeout', '$log',
          'backendProperties',
          CategoryController
       ]);

  function CategoryController(categoryService, $timeout, $log, backendProperties) {
      var self = this;
      self.categories = [];

      categoryService.get(new odataQuery()
            .filter("Key eq '" + backendProperties.rootCategory + "'")).then(function (answer) {
                self.categories = answer.data.value;
            });
  }

})();
