// Use Lodash as a utility library.
angular.module('BookStore').controller('BookStoreController', ['$scope', function ($scope) {
  // Use these sample books for front-end portion. Might move this to server when doing backend portion.
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

  this.addNewBook = () => {
    // If user try to submit without all fields filled, don't accept.
    if (isIncompleteBook(this.newBook)) return;
    this.books.push({
      isbn: this.newBook.isbn,
      title: this.newBook.title,
      author: this.newBook.author,
      genre: this.newBook.genre,
      price: this.newBook.price
    });
    // Reset this.newBook object, so UI doesn't show it anymore.
    _.forOwn(this.newBook, (value, key) => {
      delete this.newBook[key];
    });
  };

  this.deleteBook = isbn => {
    _.remove(this.books, book => book.isbn === isbn);
  };

  // Verify if the user has filled in every field.
  function isIncompleteBook(bookObj) {
    if (bookObj === undefined) return true;
    const necessaryProps = ['isbn', 'title', 'author', 'genre', 'price'];
    return necessaryProps.some(prop => bookObj[prop] === undefined);
  }

  // for testing
  this.isIncompleteBook = isIncompleteBook;
}]);
