import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import BookCard from './BookCard';

function BookForm({ url }) {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const handleAddBook = (e) => {
    e.preventDefault();
    if (author && title) {
      const newBook = {
        item_id: uuidv4(),
        author: capitalizeFirstLetter(author),
        title: capitalizeFirstLetter(title),
        category: 'Fiction',
      };
      axios.post('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books', newBook)
        .then(() => {
          setBook((prevBooks) => ({
            ...prevBooks,
            [newBook.item_id]: [newBook],
          }));
          setAuthor('');
          setTitle('');
        })
        .catch((error) => setError(error.message));
    }
  };

  const handleRemoveBook = (itemIdToDelete) => {
    axios.get('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books')
      .then((response) => {
        const { data } = response;
        const keys = Object.keys(data);
        if (keys.includes(itemIdToDelete)) {
          axios.delete(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books/${itemIdToDelete}`)
            .then(() => {
              setBook((prevBooks) => {
                const updatedBooks = { ...prevBooks };
                delete updatedBooks[itemIdToDelete];
                return updatedBooks;
              });
            })
            .catch((error) => setError(error.message));
        } else {
          setError('The Book does{n Exist.');
        }
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => setError(error.message));
  }, [url]);

  return (
    <>
      <div className="book-list">
        { Object.keys(book).map((k) => (
          <BookCard bookId={k} books={book[k]} handleRemoveBook={handleRemoveBook} key={k} />
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <hr className="my-4" />
          <h2 className="add-tittle">ADD NEW BOOK</h2>
          <form className="row" onSubmit={handleAddBook}>
            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
              <label htmlFor="title" className="w-100 mb-2">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-labelledby="title-label"
                  placeholder="Book title"
                  required
                />
              </label>
            </div>
            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
              <label htmlFor="author" className="w-100 mb-2">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  aria-labelledby="author-label"
                  placeholder="Book Author"
                  required
                />
              </label>
            </div>
            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
              <button type="submit" className="btn add-btn">Add Book</button>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </>
  );
}

BookForm.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookForm;
