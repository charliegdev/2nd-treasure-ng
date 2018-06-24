'use strict';

angular.module('BookStore').controller('BookStoreController', [function () {
  var _this = this;

  this.todos = [{ text: 'learn AngularJS', done: true }, { text: 'build an AngularJS app', done: false }];

  this.books = [{
    isbn: '9780142424179',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    genre: 'Young adult fiction',
    price: 15.05
  }, {
    isbn: '9780062387240',
    title: 'Divergent',
    author: 'Veronica Roth',
    genre: 'Dystopian Literature',
    price: 15.05
  }, {
    isbn: '9780545663267',
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    genre: 'Dystopian Literature',
    price: 12.48
  }, {
    isbn: '9780307588371',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Mystery',
    price: 18.37
  }, {
    isbn: '9780553418026',
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    price: 14.83
  }];

  this.addNewBook = function () {
    _this.books.push({
      isbn: _this.newBook.ISBN,
      title: _this.newBook.title,
      author: _this.newBook.author,
      genre: _this.newBook.genre,
      price: _this.newBook.price
    });
    _.forOwn(_this.newBook, function (value, key) {
      delete _this.newBook[key];
    });
  };

  this.deleteBook = function () {};
}]);