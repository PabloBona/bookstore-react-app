import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';
import Button from './Button';

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
        <div>
          <hr />
          <h2 className="text-secondary p-3 text-uppercase">Add New Book</h2>
          <form className="col-12-sm" onSubmit={handleSubmit}>
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
            <Button onClick={handleSubmit} type="submit">
              <div className="bg-primary rounded p-1 text-white btn-reset">Add New Book</div>
            </Button>
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
