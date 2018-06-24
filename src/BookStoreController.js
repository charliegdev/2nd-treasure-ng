angular.module('BookStore').controller('BookStoreController', [function () {
  this.todos = [
    { text: 'learn AngularJS', done: true },
    { text: 'build an AngularJS app', done: false },
  ];

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

  this.addTodo = () => {
    this.todos.push({ text: this.todoText, done: false });
    this.todoText = '';
  };

  this.remaining = () => {
    let count = 0;
    angular.forEach(this.todos, (todo) => {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  this.archive = () => {
    const oldTodos = this.todos;
    this.todos = [];
    angular.forEach(oldTodos, function (todo) {
      if (!todo.done) this.todos.push(todo);
    });
  };
},
]);
