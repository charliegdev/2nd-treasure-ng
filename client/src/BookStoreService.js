angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  const svc = {};

  /*
  svc.updateBooks = books => {
    $http.post
  }
  */
  svc.getDefaultBooks = () => {
    return $http.get('/books').then(response => {
      console.log(response.data);
      return response.data;
    }, error => error);
  };
  return svc;
}]);