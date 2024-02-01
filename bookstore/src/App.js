import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch categories on component mount
    fetch('http://localhost:3001/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

    // Fetch all books initially
    fetch('http://localhost:3001/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddToCart = (book) => {
    fetch('http://localhost:3001/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId: book.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCart([...cart, book]);
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  const handleRemoveFromCart = (bookId) => {
    fetch(`http://localhost:3001/api/cart/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCart(cart.filter((book) => book.id !== bookId));
      })
      .catch((error) => console.error('Error removing from cart:', error));
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
        {books
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
