import React from 'react';
import PropTypes from 'prop-types';

function Book({ book, onDelete }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="border bg-white p-3">
            <p>Category</p>
            <h5>
              {book.title}
            </h5>
            <p className="text-primary">
              {book.author}
            </p>
            <button type="submit" onClick={() => onDelete(book.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Book;
