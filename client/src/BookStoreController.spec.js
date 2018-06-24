describe('BookStoreController', () => {
  beforeEach(angular.mock.module('BookStore'));

  let $controller, $rootScope, $scope, controller;
  let mockBookList;

  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(() => {
    $scope = $rootScope.$new();
    controller = $controller('BookStoreController', { $scope });

    mockBookList = [
      {
        isbn: '9780142424179',
        title: 'The Fault in Our Stars',
        author: 'John Green',
        genre: 'Young adult fiction',
        price: 15.05
      },
      {
        isbn: '9780062387240',
        title: 'Divergent',
        author: 'Veronica Roth',
        genre: 'Dystopian Literature',
        price: 15.05
      }
    ];
  });

  describe('addNewBook function', () => {
    it('returns true just for setting up config.', () => {
      expect(true).toBe(true);
    });

    it('rejects incomplete book submission', () => {
      const incompleteBook = undefined;
      expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
    });

    it('rejects incomplete book submission, part 2', () => {
      const incompleteBook = { isbn: '1234567890123', title: 'Test Title' };
      expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
    });

    it('accepts complete book submission', () => {
      const incompleteBook = {
        isbn: '1234567890123',
        title: 'Test Title',
        author: 'Test author',
        genre: 'Science fiction',
        price: 123
      };
      expect(controller.isIncompleteBook(incompleteBook)).toBe(false);
    });

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

    it('refuses to add incomplete book submission', () => {
      controller.books = [...mockBookList];
      const theMartianIncomplete = {
        isbn: '9780553418026',
        title: 'The Martian'
      };

      controller.addNewBook(theMartianIncomplete);
      expect(controller.books.length).toBe(2);
    });
  });
  
  describe('deleteBook function', () => {
    it('deletes books if there is an isbn match', () => {
      controller.books = [...mockBookList];
      controller.deleteBook('9780142424179');

      expect(controller.books.length).toBe(1);
    });

    it('refuses to delete books if there isbn doesn\'t match', () => {
      controller.books = [...mockBookList];
      controller.deleteBook('testtesttest');

      expect(controller.books.length).toBe(2);
    });

    it('does not crash the program when the list is empty', () => {
      controller.books = [];
      controller.deleteBook('test');

      expect(controller.books.length).toBe(0);
    });
  });

  describe('updateBook function', () => {
    it('update book information if isbn is a match', () => {
      controller.books = mockBookList;
      const modifiedBook = {
        isbn: '9780062387240',
        title: 'DivergentModifiedTitle',
        author: 'Veronica Roth',
        genre: 'Dystopian Literature',
        price: 15.05
      };

      controller.updateBook(modifiedBook);
      expect(controller.books[1].title).toBe('DivergentModifiedTitle');
    });

    it('refuses to update if isbn is not a match', () => {
      controller.books = mockBookList;
      const sameBook = {
        isbn: '9780062387240',
        title: 'Divergent',
        author: 'Veronica Roth',
        genre: 'Dystopian Literature',
        price: 15.05
      };

      controller.updateBook(sameBook);
      expect(controller.books).toEqual(mockBookList);
    });

    it('updates the book if only some fields are changed', () => {
      controller.books = mockBookList;
      const sameBook = {
        title: 'DivergentChangedTitle2',
      };

      controller.updateBook(sameBook);
      expect(controller.books[1].title).toEqual('DivergentChangedTitle2');
    });

    it('uses isbn as UID', () => {
      controller.books = mockBookList;
      const changedISBN = {
        isbn: '9780062387241', // ISBN changed
        title: 'Divergent',
        author: 'Veronica Roth',
        genre: 'Dystopian Literature',
        price: 15.05
      };

      controller.updateBook(changedISBN);
      expect(controller.books).toEqual(mockBookList);
    });
  });
});
