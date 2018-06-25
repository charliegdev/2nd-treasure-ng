'use strict';

angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  var svc = {};

  // Correspond to CRUD
  svc.addNewBook = function (newBook) {
    return $http.post('/addNewBook', newBook);
  };
  svc.getDefaultBooks = function () {
    return $http.get('/books');
  };
  svc.updateAllBooks = function (allBooks) {
    return $http.put('/updateBook', allBooks);
  };
  svc.deleteBook = function (unwantedBookISBN) {
    return $http.delete('/deleteBook/' + unwantedBookISBN);
  };
  return svc;
}]);