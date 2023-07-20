import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from './Button';

function BookForm({ url }) {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  console.log(book);
  useEffect(() => {
    const URL = url;
    axios.get(URL)
      .then((res) => setBook(res.data))
      .catch((error) => setError(error.message));
  }, [url]);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handleAddBook = () => {
    if (author && title) {
      const newBook = {
        item_id: Date.now(),
        author: capitalizeFirstLetter(author),
        title: capitalizeFirstLetter(title),
        category: 'Fiction',
      };

      axios.post('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books', newBook)
        .then((res) => {
          setBook((prevBooks) => ({
            ...prevBooks,
            [res.data.item_id]: [res.data],
          }));
          setAuthor('');
          setTitle('');
        })
        .catch((error) => setError(error.message));
    }
  };

  return (
    <section className="container">
      <div className="row">
        <div>
          <hr />
          <h2 className="text-secondary p-3 text-uppercase">Add New Book</h2>
          <form className="col-12-sm">
            <label className="px-3" htmlFor="title">
              <input
                className="px-2 py-1 rounded border border-secondary"
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
                className="px-2 py-1 rounded border border-secondary"
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
              <div className="bg-primary rounded p-1 text-white btn-reset">Add New Book</div>
            </Button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </section>
  );
}

BookForm.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookForm;
