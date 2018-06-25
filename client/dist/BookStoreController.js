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
    BookStoreService.addNewBook(Object.assign({}, newBook)).then(function (response) {
      _this.books.push({
        isbn: newBook.isbn,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        price: newBook.price,
        uuid: response.data
      });
      // Reset this.newBook object, so UI doesn't show it anymore.
      _.forOwn(newBook, function (value, key) {
        delete newBook[key];
      });
    }, function (error) {
      console.error(error);
    });
  };

  // The reason we're 
  this.bookUpdated = function (uuid) {
    var updatedBook = _this.books.find(function (book) {
      return book.uuid === uuid;
    });
    BookStoreService.updateAllBooks(updatedBook);
  };

  this.deleteBook = function (isbn) {
    _.remove(_this.books, function (book) {
      return book.isbn === isbn;
    });
    BookStoreService.deleteBook(isbn);
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