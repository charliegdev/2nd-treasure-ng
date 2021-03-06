angular.module('BookStore').controller('BookStoreController', ['BookStoreService', function (BookStoreService) {
  // Lodash is used as a util library. So there will be functions that look like _.func.
  this.isUpdateMode = false; // This value gets changed in BookList.html

  // getDefaultBooks is a promise. Use .then to assign the books retrieved from server to this.books. AngularJS will update the view.
  this.books = undefined; 
  BookStoreService.getDefaultBooks().then(response => { this.books = response.data; }, error => { console.error(error); });

  this.addNewBook = newBook => {
    // If user try to submit without all fields filled, don't accept. Should put more indications on the UI.
    // Maybe inline prompt, and disable the button?
    if (isIncompleteBook(newBook)) return;

    // Use Object.assign({}, newBook) to make sure we don't reference or modify newBook. 
    BookStoreService.addNewBook(Object.assign({}, newBook)).then(response => {
      // In success callback, the view will be updated only if the server accepts our new book.
      this.books.push({
        isbn: newBook.isbn,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        price: newBook.price,
        uuid: response.data
      });

      // Reset this.newBook object, so UI doesn't show entered text anymore. Good thing we used a copy of newBook above,
      // otherwise this clearing operation might cause a race condition and make the UI add nothing.
      _.forOwn(newBook, (value, key) => {
        delete newBook[key];
      });
    }, error => {
      // If for any reason the server doesn't accept our new record, put a handler here so app doesn't crash.
      console.error(error);
    });
  };

  // Use UUID instead of ISBN as id, because the update might happen on the ISBN itself.
  this.bookUpdated = uuid => {
    const updatedBook = this.books.find(book => book.uuid === uuid);
    BookStoreService.updateAllBooks(updatedBook);
  };

  this.deleteBook = uuid => {
    _.remove(this.books, book => book.uuid === uuid);
    BookStoreService.deleteBook(uuid);
  };

  // Verify if the user has filled in every field.
  function isIncompleteBook(bookObj) {
    // Stick with pure function as much as possible. Try not to access "this".
    if (bookObj === undefined) return true;
    const necessaryProps = ['isbn', 'title', 'author', 'genre', 'price'];
    return necessaryProps.some(prop => bookObj[prop] === undefined); // "Is some property undefined?"
  }

  // for testing
  this.isIncompleteBook = isIncompleteBook;
}]);
