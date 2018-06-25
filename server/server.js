// Not much bigger than a barebone Express server; mostly because the heavy lifting happens in the browser.
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  path = require('path'),
  _ = require('lodash'),
  uuidv4 = require('uuid/v4');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Should have used a database to store these. No time. Restart the server will restore data back to this.
// Can't use ISBN as unique ID. What if someone entered an ISBN then found out he made a typo? Use UUID instead.
const books = [
  { isbn: '9780142424179', title: 'The Fault in Our Stars', author: 'John Green', genre: 'Young adult fiction', price: 15.05, uuid: uuidv4() },
  { isbn: '9780062387240', title: 'Divergent', author: 'Veronica Roth', genre: 'Dystopian Literature', price: 15.05, uuid: uuidv4() },
  { isbn: '9780545663267', title: 'Mockingjay', author: 'Suzanne Collins', genre: 'Dystopian Literature', price: 12.48, uuid: uuidv4() },
  { isbn: '9780307588371', title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Mystery', price: 18.37, uuid: uuidv4() },
  { isbn: '9780553418026', title: 'The Martian', author: 'Andy Weir', genre: 'Science Fiction', price: 14.83, uuid: uuidv4() }
];

// Second Treasures Routes
app.get('/books', (req, res) => { res.send(books); });

app.post('/addNewBook', (req, res) => {
  const newBookEntry = Object.assign({}, req.body); // Prefer not to mutate parameter object.
  newBookEntry.uuid = uuidv4(); // All other fields are collected on the client, but UUID is generated on the server.
  books.push(newBookEntry);
  res.send(newBookEntry.uuid);
});

app.delete('/deleteBook/:uuid', (req, res) => {
  // Should put more security on this, to make sure unauthorized DELETE won't be execused. Maybe using POST is better?
  const unwantedUUID = req.params.uuid;
  _.remove(books, book => book.uuid === unwantedUUID);
  res.send('Deleted specified book.');
});

app.put('/updateBook', ({ body }, res) => { // Use Object destructuring in params to indicate I'm only interested in req.body.
  const { uuid } = body;
  books.forEach(book => {
    if (book.uuid === uuid) {
      Object.assign(book, body); // Mutate books array intentionally.
    }
  });
  res.send('Book updated.');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html')); // Use path.join(...paths) instead of string, for cross-OS support.
});

app.listen(8080);
console.log('Second Treasures BookStore server is running on 8080');
