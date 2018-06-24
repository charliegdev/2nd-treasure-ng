'use strict';

// Use Lodash as a utility library.
angular.module('BookStore').controller('BookStoreController', ['$scope', 'BookStoreService', function ($scope, BookStoreService) {
  var _this = this;

  // Use these sample books for front-end portion. Might move this to server when doing backend portion.
  this.isUpdateMode = false;

  this.books = undefined;
  BookStoreService.getDefaultBooks().then(function (response) {
    _this.books = response.data;
  }, function (error) {
    console.log(error);
  });
  this.addNewBook = function (newBook) {
    // If user try to submit without all fields filled, don't accept.
    if (isIncompleteBook(newBook)) return;
    _this.books.push({
      isbn: newBook.isbn,
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      price: newBook.price
    });
    // Reset this.newBook object, so UI doesn't show it anymore.
    _.forOwn(newBook, function (value, key) {
      delete newBook[key];
    });
  };

  this.bookUpdated = function () {
    console.log('Book updated.');
  };

  this.deleteBook = function (isbn) {
    _.remove(_this.books, function (book) {
      return book.isbn === isbn;
    });
  };

  // Verify if the user has filled in every field.
  function isIncompleteBook(bookObj) {
    if (bookObj === undefined) return true;
    var necessaryProps = ['isbn', 'title', 'author', 'genre', 'price'];
    return necessaryProps.some(function (prop) {
      return bookObj[prop] === undefined;
    });
  }

  // for testing
  this.isIncompleteBook = isIncompleteBook;
}]);