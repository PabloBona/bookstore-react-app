import React from 'react';
import BookForm from './BookForm';

function BookList() {
  const url = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books';
  return (

    <section className="container">
      <div className="row my-3">

        <div className="col-12">
          <BookForm url={url} />
        </div>
      </div>
    </section>

  );
}

export default BookList;
