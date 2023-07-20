/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';

function BookForm({ url }) {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handleAddBook = () => {
    if (author && title) {
      const newBook = {
        item_id: Date.now().toString(),
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

  // Renderiza los libros
  const renderedBooks = Object.values(book).map((books) => (
    <div key={uuidv4()} className="container">
      {books.map((book) => (
        <div key={uuidv4()} className="row bg-white border border-primary-subtle m-3 rounded">
          <div className="col-5">
            <div className="p-3">
              <p>Category</p>
              <h5 className="fw-bolder">{book.title}</h5>
              <p className="text-primary">{book.author}</p>
              <div className="mod-books">
                <div className="remove link-separator mb-2">
                  <Button className="mb-2" onClick={() => { }}>
                    Comment
                  </Button>
                </div>
                <div className="remove link-separator mb-2">
                  <Button onClick={() => { }}>Remove</Button>
                </div>
                <div className="remove mb-2">
                  <Button onClick={() => { }}>Edit</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex col-4 align-self-center columne">
            <div>
              {' '}
              <p className="d-flex justify-content-center oval-2 text-white">
                <span className="align-items-sm-center align-self-md-center bg-body-tertiary d-flex p-md-3 rounded-5 text-light circ" />
              </p>
            </div>
            <div>
              {' '}
              <p className="align-self-sm-center mx-3 fs-3">64%</p>
              <p className="align-self-sm-center mx-3 text-secondary">Completed</p>
            </div>
          </div>
          <div className="col-3 py-3">
            <div className="my-3">
              <p className="text-secondary">Current Chapter</p>
              <p>Chapter 23</p>
            </div>
            <button className="col-md-8 text-white border border-primary rounded fz-5 bg-color" type="submit">
              Update Progress
            </button>
          </div>
        </div>
      ))}
    </div>
  ));

  useEffect(() => {
    axios.get(url)
      .then((res) => setBook(res.data))
      .catch((error) => setError(error.message));
  }, [url, book]);

  return (
    <section className="container">
      <div className="row mt-3">
        {renderedBooks}
      </div>
      <div className="row">
        <div>
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

      {/* Renderiza los libros */}

    </section>
  );
}

BookForm.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookForm;
