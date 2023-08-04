import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function BookCard({
  books, handleRemoveBook, bookId,
}) {
  const book = books[0];
  return (
    <div className="card bg-white border border-tertiary my-3 rounded book-card">
      <div className="row">
        <div className="col-12 col-sm-5">
          <p className="category">Category</p>
          <h3 className="title">{book.title}</h3>
          <p className="autor">{book.author}</p>
          <div className="mod-books">
            <div className="remove link-separator">
              <Button onClick={() => {}} className="mb-2">
                Comment
              </Button>
            </div>
            <div className="remove link-separator">
              <Button onClick={() => handleRemoveBook(bookId)}>Remove</Button>
            </div>
            <div className="remove">
              <Button onClick={() => {}}>Edit</Button>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 d-flex align-self-center columne">
          <div className="progress-bar my-3" />
          <div className="m-3">
            <div className="align-self-sm-center fs-2">64%</div>
            <p className="align-self-sm-center text-secondary">Completed</p>
          </div>
        </div>
        <div className="col-12 col-sm-3">
          <p className="current-chapter mb-1">CURRENT CHAPTER</p>
          <p className="chapter">Chapter 23</p>
          <button className="btn update-progress" type="submit">UPDATE PROGRESS</button>
        </div>
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
