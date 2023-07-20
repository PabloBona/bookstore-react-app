import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import BookCard from './BookCard';
import BookForm from './BookForm';
import { setBook } from '../redux/books/booksSlice';
// import { removeBook, addBook } from '../redux/books/booksSlice';

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const handleRemoveBook = (bookId) => {
    dispatch(setBook(bookId));
  };

  const url = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books';
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
        <BookForm url={url} />
      </div>
    </article>
  );
}

export default BookList;
