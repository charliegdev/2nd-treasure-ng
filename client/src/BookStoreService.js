angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  const svc = {};

  /*
  svc.updateBooks = books => {
    $http.post
  }
  */
  svc.getDefaultBooks = () => $http.get('/books'); 
  return svc;
}]);