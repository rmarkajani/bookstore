// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require( 'fs' )
const csv = require ('csv-parser')

// Create an Express application
const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (if needed)
  optionsSuccessStatus: 204, // HTTP status code for successful preflight requests
};

app.use(cors(corsOptions)); // Use cors middleware


// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Mock database (for simplicity)
const books = [];

// Define API routes

// Create a new book
app.post('/api/books', (req, res) => {
  const { title, author, isbn } = req.body;
  const newBook = { title, author, isbn };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books
app.get('/api/books', (req, res) => {
  const results = [];

  fs.createReadStream('src/assets/booklist.csv_bkup')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data)
    results.push(data)
  })
  .on('end', () => {
    // Send the parsed data as JSON response
    res.json(results);
    res.status(200).json(books);
  });
});

// Get a single book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.status(200).json(book);
  }
});

// Update a book by ID
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const updatedBook = req.body;

  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books[index] = updatedBook;
    res.status(200).json(updatedBook);
  }
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    const deletedBook = books.splice(index, 1)[0];
    res.status(200).json(deletedBook);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

