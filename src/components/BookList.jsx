import React, { useState } from 'react';

import Book from './Book';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleRemoveBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <article className="row">
      <h2 className="d-flex justify-content-center my-3">Book List</h2>
      <div className="col-12 my-2 p-3">
        {books.map((book) => (
          <Book key={book.id} book={book} onDelete={() => handleRemoveBook(book.id)} />
        ))}
      </div>
      <hr className="border my-3" />
      <div className="col-12">
        <BookForm onAdd={handleAddBook} />
      </div>
    </article>
  );
}

export default BookList;
