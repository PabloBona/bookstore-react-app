import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';

function BookForm({
  author, setAuthor, title, setTitle,
}) {
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && title) {
      const newBook = {
        itemId: Date.now(),
        author: capitalizeFirstLetter(author),
        title: capitalizeFirstLetter(title),
      };
      dispatch(addBook(newBook));
      setAuthor('');
      setTitle('');
    }
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col">
          <hr />
          <h2 className="text-secondary p-3">Add New Book</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-labelledby="title-label"
              />
            </label>
            <label htmlFor="author">
              Author:
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                aria-labelledby="author-label"
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </section>
  );
}

BookForm.propTypes = {
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default BookForm;
