import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import BookCard from './BookCard';

function BookForm({ url }) {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handleAddBook = () => {
    if (author && title) {
      const newBook = {
        item_id: uuidv4(),
        author: capitalizeFirstLetter(author),
        title: capitalizeFirstLetter(title),
        category: 'Fiction',
      };

      axios.post('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books', newBook)
        .then(() => {
          setBook((prevBooks) => ({
            ...prevBooks,
            [newBook.item_id]: [newBook],
          }));
          setAuthor('');
          setTitle('');
        })
        .catch((error) => setError(error.message));
    }
  };

  const handleRemoveBook = (itemIdToDelete) => {
    // Hacer la petición GET para obtener la información del libro y extraer la key
    axios.get('https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books')
      .then((response) => {
        const { data } = response;
        const keys = Object.keys(data);

        // Verificar si la key (itemIdToDelete) existe en el objeto JSON de la respuesta
        if (keys.includes(itemIdToDelete)) {
          // Si la key existe, realizar el DELETE a la API con la key (itemIdToDelete)
          axios.delete(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/Fm2ydOLEbPj67CnsICQF/books/${itemIdToDelete}`)
            .then(() => {
              // Realizar las actualizaciones necesarias en el estado (setBook)
              setBook((prevBooks) => {
                const updatedBooks = { ...prevBooks };
                delete updatedBooks[itemIdToDelete];
                return updatedBooks;
              });
            })
            .catch((error) => setError(error.message));
        } else {
          // Si la key no existe, manejar el error adecuadamente
          setError('The Book does{n Exist.');
        }
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => setError(error.message));
  }, [url]);

  return (
    <>
      <div className="mt-3">
        { Object.keys(book).map((k) => (
          <BookCard bookId={k} books={book[k]} handleRemoveBook={handleRemoveBook} key={k} />
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="text-secondary my-3 text-uppercase">Add New Book</h2>
          <form>
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
            <Button onClick={handleAddBook} type="button">
              <div className="bg-primary rounded p-1 text-white btn-reset">Add New Book</div>
            </Button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </>
  );
}

BookForm.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookForm;
