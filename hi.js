// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of the express application
const app = express();

// Enable parsing of JSON data in the request body
app.use(bodyParser.json());

// Define an array of books
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' }
];

// Define a GET endpoint that returns the list of books
app.get('/books', (req, res) => {
  res.json(books);
});

// Define a POST endpoint that adds a new book to the list
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.json(newBook);
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports=app