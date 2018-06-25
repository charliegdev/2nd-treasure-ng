'use strict';

angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  var svc = {};

  /*
  svc.updateBooks = books => {
    $http.post
  }
  */
  svc.getDefaultBooks = function () {
    return $http.get('/books');
  };
  svc.addNewBook = function (newBook) {
    return $http.post('/addNewBook', newBook);
  };
  return svc;
}]);