/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';

function BookCard({ url }) {
  const [book, setBook] = useState();
  useEffect(() => {
    const URL = url;
    axios.get(URL)
      .then((res) => setBook(res.data));
  });

  return (
    <div className="container">
      <div className="row bg-white border border-primary-subtle m-3 rounded">
        <div className="col-5">
          <div className="p-3">
            <p>Category</p>
            <h5 className="fw-bolder">{book.title}</h5>
            <p className="text-primary">{book.author}</p>
            <div className="mod-books">
              <div className="remove link-separator mb-2">
                <Button className="mb-2" onClick={() => { }}>Comment</Button>
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
    </div>
  );
}

export default BookCard;
