// browser-sync start --server --directory --files "**/*"
(function() {
'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)


  // ShoppingListCheckOffService.$inject = ['$scope']
  function ShoppingListCheckOffService() {
    var checker = this

    var buyList = [ { name: "cookies", quantity: 10 },
          { name: "beers", quantity: 12 },
          { name: "pizzas", quantity: 4 },
          { name:  "puppies", quantity: 3 },
          { name:  "apples", quantity: 200 }]
    var boughtList = []


    checker.getBuyList = function() {
      return buyList
    }

    checker.getBoughtList = function() {
      return boughtList
    }

    checker.buyItem = function(idx) {
      boughtList.push(buyList.splice(idx, 1)[0])
    }
  }


  ToBuyController.$inject = [ 'ShoppingListCheckOffService' ]
  function ToBuyController(ShoppingListCheckOffService) {
    var buyer = this
    buyer.itemList = ShoppingListCheckOffService.getBuyList()

    buyer.buyItem = function(i) {
      ShoppingListCheckOffService.buyItem(i)
    }
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this
    bought.itemList = ShoppingListCheckOffService.getBoughtList()
  }
})()
