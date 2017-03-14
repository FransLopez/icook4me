/* eslint no-undef: "off" */
(function () {
  'use strict'
  angular
    .module('iCook4meApp')
    .controller('SearchCtrl', SearchCtrl)

  function SearchCtrl ($scope, $rootScope, ExternalRecipesFact, $location, $anchorScroll) {
    let querySearch = ''
    // pagination functionality
    let pagesShown = 1
    let pageSize = 12

    $scope.$on('searchRecipes', function (event, query) {
      pagesShown = 1
      querySearch = query
      $rootScope.recipesSearch = ExternalRecipesFact.allRecipes(querySearch)
      $location.hash('navbar-primary')
      $anchorScroll()
    })
    // Pagination functionality
    $scope.paginationLimit = function () {
      return pageSize * pagesShown
    }
    $scope.hasMoreItemsToShow = (num) => {
      return pagesShown > (num / pageSize)
    }
    $scope.showMoreItems = function () {
      let page = pagesShown + 1
      ExternalRecipesFact.searchFood2fork(querySearch, page)
        .then(recipes => {
          $rootScope.recipesSearch.push(...recipes)
        })
      ExternalRecipesFact.searchEdamam(querySearch, page)
        .then(recipes => {
          $rootScope.recipesSearch.push(...recipes)
        })
      pagesShown = page
    }
  }
})()
