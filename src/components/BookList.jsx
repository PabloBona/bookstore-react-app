import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from './BookCard';
import BookForm from './BookForm';
import { removeBook, addBook } from '../redux/books/booksSlice';

function BookList({
  author, setAuthor, title, setTitle,
}) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  const handleAddBook = (newBook) => {
    dispatch(addBook(newBook));
  };

  return (
    <article className="row">

      <div className="col-12">
        {books.map((book) => (
          <BookCard
            key={book.itemId}
            book={book}
            removeBook={() => handleRemoveBook(book.itemId)}
          />
        ))}
      </div>
      <hr className="border" />
      <div className="col-12 my-3">
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

BookList.propTypes = {
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default BookList;
