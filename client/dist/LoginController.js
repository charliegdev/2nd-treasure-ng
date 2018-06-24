'use strict';

angular.module('BookStore').controller('LoginController', ['$scope', function ($scope) {
  var _this = this;

  this.isLoggedIn = false;
  this.login = function () {
    _this.isLoggedIn = true;
  };
  this.logout = function () {
    _this.isLoggedIn = false;
  };
}]);