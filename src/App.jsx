import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import Categories from './components/Categories';
import './App.css';
import Header from './components/Header';

function App() {
  const [books, setBooks] = useState([]);

  const handleRemoveBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<BookList books={books} onDelete={handleRemoveBook} />}
        />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
