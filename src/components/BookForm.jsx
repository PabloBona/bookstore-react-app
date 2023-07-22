import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import BookCard from './BookCard';

function BookForm({ url }) {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const handleAddBook = () => {
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
      <div className="mt-3">
        { Object.keys(book).map((k) => (
          <BookCard bookId={k} books={book[k]} handleRemoveBook={handleRemoveBook} key={k} />
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <hr className="py-2" />
          <h2 className="add-tittle">Add New Book</h2>
          <form className="col-form-label-lg add-book">
            <label className="px-3" htmlFor="title">
              <input
                className="px-2 py-1 rounded border border-secondary input-title"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-labelledby="title-label"
                placeholder="Book title"
                required
              />
            </label>
            <label className="px-3" htmlFor="author">
              <input
                className="px-2 py-2 rounded border border-secondary input-author"
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                aria-labelledby="author-label"
                placeholder="Book Author"
                required
              />
            </label>
            <Button onClick={handleAddBook} type="button">
              <div className="btn add-btn ">Add Book</div>
            </Button>
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
