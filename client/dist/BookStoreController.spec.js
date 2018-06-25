'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

describe('BookStoreController', function () {
  beforeEach(angular.mock.module('BookStore'));

  var $controller = void 0,
      $rootScope = void 0,
      $scope = void 0,
      controller = void 0;
  var mockBookList = void 0;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function () {
    $scope = $rootScope.$new();
    controller = $controller('BookStoreController', { $scope: $scope });

    mockBookList = [{
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
    }];
  });

  describe('addNewBook function', function () {
    it('returns true just for setting up config.', function () {
      expect(true).toBe(true);
    });

    it('rejects incomplete book submission', function () {
      var incompleteBook = undefined;
      expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
    });

    it('rejects incomplete book submission, part 2', function () {
      var incompleteBook = { isbn: '1234567890123', title: 'Test Title' };
      expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
    });

    it('accepts complete book submission', function () {
      var incompleteBook = {
        isbn: '1234567890123',
        title: 'Test Title',
        author: 'Test author',
        genre: 'Science fiction',
        price: 123
      };
      expect(controller.isIncompleteBook(incompleteBook)).toBe(false);
    });

    // This test will fail after controller is entangled with service... how do we refactor the controller?
    /*
    it('adds new book into its model', () => {
      controller.books = [...mockBookList];
      const theMartian = {
        isbn: '9780553418026',
        title: 'The Martian',
        author: 'Andy Weir',
        genre: 'Science Fiction',
        price: 14.83
      };
       controller.addNewBook(theMartian);
      expect(controller.books.length).toBe(3);
    });
    */

    it('refuses to add incomplete book submission', function () {
      controller.books = [].concat(_toConsumableArray(mockBookList));
      var theMartianIncomplete = {
        isbn: '9780553418026',
        title: 'The Martian'
      };

      controller.addNewBook(theMartianIncomplete);
      expect(controller.books.length).toBe(2);
    });
  });

  describe('deleteBook function', function () {
    it('deletes books if there is an isbn match', function () {
      controller.books = [].concat(_toConsumableArray(mockBookList));
      controller.deleteBook('9780142424179');

      expect(controller.books.length).toBe(1);
    });

    it('refuses to delete books if there isbn doesn\'t match', function () {
      controller.books = [].concat(_toConsumableArray(mockBookList));
      controller.deleteBook('testtesttest');

      expect(controller.books.length).toBe(2);
    });

    it('does not crash the program when the list is empty', function () {
      controller.books = [];
      controller.deleteBook('test');

      expect(controller.books.length).toBe(0);
    });
  });
});