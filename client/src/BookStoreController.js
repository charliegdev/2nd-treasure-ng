// Use Lodash as a utility library.
angular.module('BookStore').controller('BookStoreController', ['$scope', 'BookStoreService', function ($scope, BookStoreService) {
  // Use these sample books for front-end portion. Might move this to server when doing backend portion.
  this.isUpdateMode = false;
  
  this.books = undefined; 
  BookStoreService.getDefaultBooks().then(response => { this.books = response.data; }, error => { console.log(error); });
  this.addNewBook = newBook => {
    // If user try to submit without all fields filled, don't accept.
    if (isIncompleteBook(newBook)) return;
    BookStoreService.addNewBook(Object.assign({}, newBook)).then(response => {
      this.books.push({
        isbn: newBook.isbn,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        price: newBook.price,
        uuid: response.data
      });
      // Reset this.newBook object, so UI doesn't show it anymore.
      _.forOwn(newBook, (value, key) => {
        delete newBook[key];
      });
    }, error => {
      console.error(error);
    });
  };

  // The reason we're 
  this.bookUpdated = uuid => {
    const updatedBook = this.books.find(book => book.uuid === uuid);
    BookStoreService.updateAllBooks(updatedBook);
  };

  this.deleteBook = isbn => {
    _.remove(this.books, book => book.isbn === isbn);
    BookStoreService.deleteBook(isbn);
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
