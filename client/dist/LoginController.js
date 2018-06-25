'use strict';

angular.module('BookStore').controller('LoginController', ['$scope', function ($scope) {
  var _this = this;

  // Normally we would gather user credentials or cookies from users, then let server decide.
  this.isLoggedIn = false;

  // Right now, we just flip login status whenever the user presses login/logout button.
  this.login = function () {
    _this.isLoggedIn = true;
  };
  this.logout = function () {
    _this.isLoggedIn = false;
  };
}]);