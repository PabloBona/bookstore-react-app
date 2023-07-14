import React from 'react';
import PropTypes from 'prop-types';

function Book({ book, onDelete }) {
  const { id, title, author } = book;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="border bg-white p-3">
            <p>Category</p>
            <h5>
              {title}
            </h5>
            <p className="text-primary">
              {author}
            </p>
            <button type="submit" onClick={() => onDelete(id)}>
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
