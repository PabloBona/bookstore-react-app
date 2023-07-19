import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function BookCard({ book, removeBook }) {
  const { itemId, title, author } = book;

  const handleRemove = () => {
    removeBook(itemId);
  };

  return (
    <div className="container">
      <div className="row bg-white border border-primary-subtle m-3 rounded">
        <div className="col-5">
          <div className="p-3">
            <p>Category</p>
            <h5 className="fw-bolder">{title}</h5>
            <p className="text-primary">{author}</p>
            <div className="mod-books">
              <div className="remove link-separator mb-2">
                <Button className="mb-2" onClick={() => { }}>Comment</Button>
              </div>
              <div className="remove link-separator mb-2">
                <Button onClick={handleRemove}>Remove</Button>
              </div>
              <div className="remove mb-2">
                <Button onClick={() => { }}>Edit</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 align-self-center">
          <p className="d-flex justify-content-center">64%</p>
        </div>
        <div className="col-5 py-3">
          <div className="my-3">
            <p className="text-secondary">Current Chapter</p>
            <p>Chapter 23</p>
          </div>
          <button className="col-md-8 text-white border border-primary rounded px-3 fz-5 bg-color" type="submit">
            Update Progress
          </button>
        </div>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default BookCard;
