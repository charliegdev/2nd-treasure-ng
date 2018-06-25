angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  const svc = {};

  /*
  svc.updateBooks = books => {
    $http.post
  }
  */
  svc.getDefaultBooks = () => $http.get('/books'); 
  svc.addNewBook = newBook => $http.post('/addNewBook', newBook);
  svc.deleteBook = unwantedBookISBN => $http.delete(`/deleteBook/${unwantedBookISBN}`);
  svc.updateAllBooks = allBooks => $http.put('/updateBook', allBooks);
  return svc;
}]);