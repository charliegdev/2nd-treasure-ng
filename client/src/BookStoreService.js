angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  const svc = {};

  // Correspond to CRUD
  svc.addNewBook = newBook => $http.post('/addNewBook', newBook);
  svc.getDefaultBooks = () => $http.get('/books'); 
  svc.updateAllBooks = allBooks => $http.put('/updateBook', allBooks);
  svc.deleteBook = unwantedBookISBN => $http.delete(`/deleteBook/${unwantedBookISBN}`);
  return svc;
}]);