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
  svc.deleteBook = function (unwantedBookISBN) {
    return $http.delete('/deleteBook/' + unwantedBookISBN);
  };
  svc.updateAllBooks = function (allBooks) {
    return $http.put('/updateBook', allBooks);
  };
  return svc;
}]);