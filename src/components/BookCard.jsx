import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function BookCard({
  books, handleRemoveBook, bookId,
}) {
  const book = books[0];
  return (

    <div className="row bg-white border border-primary-subtle  rounded">
      <div className="col-5">
        <div className="p-3">
          <p>Category</p>
          <h5 className="fw-bolder">{book.title}</h5>
          <p className="text-primary">{book.author}</p>
          <div className="mod-books">
            <div className="remove link-separator mb-2">
              <Button onClick={() => {}} className="mb-2">
                Comment
              </Button>
            </div>
            <div className="remove link-separator mb-2">
              <Button onClick={() => handleRemoveBook(bookId)}>Remove</Button>
            </div>
            <div className="remove mb-2">
              <Button onClick={() => {}}>Edit</Button>
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

  );
}

BookCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      item_id: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired,
  bookId: PropTypes.string.isRequired,
  handleRemoveBook: PropTypes.func.isRequired,

};

export default BookCard;
