'use strict';

angular.module('BookStore').factory('BookStoreService', ['$http', function ($http) {
  var svc = {};

  /*
  svc.updateBooks = books => {
    $http.post
  }
  */
  svc.getDefaultBooks = function () {
    return $http.get('/books').then(function (response) {
      console.log(response.data);
      return response.data;
    }, function (error) {
      return error;
    });
  };
  return svc;
}]);