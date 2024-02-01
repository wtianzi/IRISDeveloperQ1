const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const categories = ['Mystery', 'Fiction', 'Thriller', 'History', 'Science'];

const booksData = [
  { id: 1, title: 'Book 1', description: 'Description 1', image: 'book1.jpg', category: 'Mystery' },
  { id: 2, title: 'Book 2', description: 'Description 2', image: 'book2.jpg', category: 'Fiction' },
  { id: 3, title: 'Book 3', description: 'Description 3', image: 'book3.jpg', category: 'Thriller' },
  { id: 4, title: 'Book 4', description: 'Description 4', image: 'book4.jpg', category: 'Mystery' },
  { id: 5, title: 'Book 5', description: 'Description 5', image: 'book5.jpg', category: 'Mystery' },
  { id: 6, title: 'Book 6', description: 'Description 6', image: 'book6.jpg', category: 'Fiction' },
  // Add more books with different categories
];

let cart = [];

// 1. GET all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// 2. GET books by category
app.get('/api/books/:category?', (req, res) => {
  const category = req.params.category;
  if (category) {
    // If a category is specified, filter books by category
    const filteredBooks = booksData.filter((book) => book.category === category);
    res.json(filteredBooks);
  } else {
    // If no category is specified, return all books
    res.json(booksData);
  }
});

// 3. Add book to cart
app.post('/api/cart', (req, res) => {
  const bookId = req.body.bookId;
  const book = booksData.find((book) => book.id === bookId);
  if (book) {
    cart.push(book);
    res.json({ message: 'Book added to cart successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// 4. Remove book from cart
app.delete('/api/cart/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const index = cart.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    cart.splice(index, 1);
    res.json({ message: 'Book removed from cart successfully' });
  } else {
    res.status(404).json({ error: 'Book not found in cart' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
