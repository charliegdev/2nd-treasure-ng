const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  path = require('path'),
  _ = require('lodash'),
  uuidv4 = require('uuid/v4');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const books = [
  {
    isbn: '9780142424179',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    genre: 'Young adult fiction',
    price: 15.05,
    uuid: uuidv4()
  },
  {
    isbn: '9780062387240',
    title: 'Divergent',
    author: 'Veronica Roth',
    genre: 'Dystopian Literature',
    price: 15.05,
    uuid: uuidv4()
  },
  {
    isbn: '9780545663267',
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    genre: 'Dystopian Literature',
    price: 12.48,
    uuid: uuidv4()
  },
  {
    isbn: '9780307588371',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Mystery',
    price: 18.37,
    uuid: uuidv4()
  },
  {
    isbn: '9780553418026',
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    price: 14.83,
    uuid: uuidv4()
  }
];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization'
  );
  next();
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', '/client')));

// Second Treasures Routes
app.get('/books', (req, res) => { res.send(books); });

app.post('/addNewBook', (req, res) => {
  const newBookEntry = Object.assign({}, req.body);
  newBookEntry.uuid = uuidv4();
  books.push(newBookEntry);
  res.send(newBookEntry.uuid);
});

app.delete('/deleteBook/:uuid', (req, res) => {
  const unwantedUUID = req.params.uuid;
  _.remove(books, book => book.uuid === unwantedUUID);
  res.send('Deleted specified book.');
});

app.put('/updateBook', ({ body }, res) => {
  const { uuid } = body;
  books.forEach(book => {
    if (book.uuid === uuid) {
      Object.assign(book, body);
    }
  });
  res.send('Book updated.');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(8080);
console.log('meet-irl is running on 8080');
