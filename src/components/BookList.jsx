import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import BookForm from './BookForm';

function BookList({
  setBooks, books, author, setAuthor, title, setTitle,
}) {
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
          <Book
            key={book.id}
            book={book}
            onDelete={() => handleRemoveBook(book.id)}
          />
        ))}
      </div>
      <hr className="border my-3" />
      <div className="col-12">
        <BookForm
          onAdd={handleAddBook}
          author={author}
          setAuthor={setAuthor}
          title={title}
          setTitle={setTitle}
        />
      </div>
    </article>
  );
}

const bookShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
});

BookList.propTypes = {
  setBooks: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(bookShape).isRequired,
};
export default BookList;
