import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function BookCard({
  books, handleRemoveBook, bookId,
}) {
  const book = books[0];
  return (

    <div className="row bg-white border border-tertiary my-3 rounded">
      <div className="col-5">
        <div className="p-3">
          <div className="text-secondary">Category</div>
          <div className="fw-bolder fs-3 title">{book.title}</div>
          <p className="autor">{book.author}</p>
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
        <div className="progress-bar my-3" />
        <div className="py-3">
          {' '}
          <div className="align-self-sm-center fs-2 px-3">64%</div>
          <p className="align-self-sm-center mx-3 text-secondary">Completed</p>
        </div>
      </div>
      <div className="col-3 py-3">
        <div className="my-3">
          <p className="current-chapter">Current Chapter</p>
          <p className="chapter">Chapter 23</p>
        </div>
        <button className="text-white border border-primary rounded text-sm bg-color" type="submit">
          <div className="m-1 update-progress">UPDATE PROGRESS</div>
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
