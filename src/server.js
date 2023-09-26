// server.js (Node.js and Express example)

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Update book quantity route
app.put('http://localhost:3000/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const newQuantity = req.body.quantity; // Assuming you send the new quantity in the request body

  // Read the CSV file
  const csvData = fs.readFileSync('src/assets/booklist.csv', 'utf-8');
  const lines = csvData.split('\n');

  // Modify the CSV data to update the book quantity
  // You would need to parse the CSV, update the quantity, and convert it back to CSV

  // Save the updated CSV data back to the file
  fs.writeFileSync('src/assets/booklist.csv', updatedCsvData);

  res.json({ message: 'Book quantity updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

