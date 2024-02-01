import React, { useState } from 'react';
import './App.css';

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

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [cart, setCart] = useState([]);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddToCart = (book) => {
    setCart([...cart, book]);
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  return (
    <div className="app">

    <div className="pane">
    <h2>Book Categories</h2>
    <ul>
      {categories.map((category) => (
        <li key={category}>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategorySelect(category)}
            />
            {category}
          </label>
        </li>
      ))}
    </ul>
    </div>

      <div className="pane">
        <h2>Books</h2>
        {booksData
          .filter((book) => selectedCategories.length === 0 || selectedCategories.includes(book.category))
          .map((book) => (
            <div key={book.id} className="book">
              <img src={book.image} alt={book.title} />
              <div>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
              </div>
              
            </div>
          ))}
      </div>

      <div className="pane">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((book) => (
            <li key={book.id}>
              {book.title}{' '}
              <button onClick={() => handleRemoveFromCart(book.id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
