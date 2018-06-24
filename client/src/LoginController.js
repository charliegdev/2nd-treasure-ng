angular.module('BookStore').controller('LoginController', ['$scope', function ($scope) {
  this.isLoggedIn = false;
  this.login = () => { this.isLoggedIn = true; };
  this.logout = () => { this.isLoggedIn = false; };
}]);