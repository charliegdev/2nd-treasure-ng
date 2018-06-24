angular.module('BookStore').controller('LoginController', ['$scope', function ($scope) {
  this.isLoggedIn = true;
  this.login = () => { this.isLoggedIn = true; };
  this.logout = () => { this.isLoggedIn = false; };
}]);