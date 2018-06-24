// Use Lodash as a utility library.
angular.module('BookStore').controller('BookStoreController', ['$scope', 'BookStoreService', function ($scope, BookStoreService) {
  // Use these sample books for front-end portion. Might move this to server when doing backend portion.
  this.isUpdateMode = false;
  
  this.books = undefined; 
  BookStoreService.getDefaultBooks().then(books => { this.books = books; }, error => { console.log(error); });
  this.addNewBook = newBook => {
    // If user try to submit without all fields filled, don't accept.
    if (isIncompleteBook(newBook)) return;
    this.books.push({
      isbn: newBook.isbn,
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      price: newBook.price
    });
    // Reset this.newBook object, so UI doesn't show it anymore.
    _.forOwn(newBook, (value, key) => {
      delete newBook[key];
    });
  };

  this.bookUpdated = () => {
    console.log('Book updated.');
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
