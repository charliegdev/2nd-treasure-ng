angular.module('BookStore').controller('LoginController', ['$scope', function ($scope) {
  // Normally we would gather user credentials or cookies from users, then let server decide.
  this.isLoggedIn = false;
  
  // Right now, we just flip login status whenever the user presses login/logout button.
  this.login = () => { this.isLoggedIn = true; };
  this.logout = () => { this.isLoggedIn = false; };
}]);