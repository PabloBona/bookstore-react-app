import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const bookstoreAPIConfig = {
  baseURL: 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/',
  bookStoreId: null,
};

const getBooksList = createAsyncThunk('bookstore/getBooksList', async (_, thunkAPI) => {
  try {
    if (!bookstoreAPIConfig.bookStoreId) {
      const bookStoreId = localStorage.getItem('bookStoreId');
      if (!bookStoreId) {
        throw new Error('No BookStore Id set.');
      }
      bookstoreAPIConfig.bookStoreId = bookStoreId;
    }

    const response = await axios.get(`${bookstoreAPIConfig.baseURL}apps/${bookstoreAPIConfig.bookStoreId}/books`);
    const bookList = response.data || [];
    return bookList;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Error fetching books: ${error.message}`);
  }
});

const handleAddBook = createAsyncThunk('bookstore/handleAddBook', async (bookData, thunkAPI) => {
  try {
    if (!bookstoreAPIConfig.bookStoreId) {
      const bookStoreId = localStorage.getItem('bookStoreId');
      if (!bookStoreId) {
        throw new Error('No BookStore Id set.');
      }
      bookstoreAPIConfig.bookStoreId = bookStoreId;
    }

    await axios.post(`${bookstoreAPIConfig.baseURL}apps/${bookstoreAPIConfig.bookStoreId}/books`, { ...bookData });
    return bookData;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Error posting new book: ${error.message}`);
  }
});

const handleRemoveBook = createAsyncThunk('bookstore/handleRemoveBook', async (itemIdToDelete, thunkAPI) => {
  try {
    if (!bookstoreAPIConfig.bookStoreId) {
      const bookStoreId = localStorage.getItem('bookStoreId');
      if (!bookStoreId) {
        throw new Error('No BookStore Id set.');
      }
      bookstoreAPIConfig.bookStoreId = bookStoreId;
    }

    await axios.delete(`${bookstoreAPIConfig.baseURL}apps/${bookstoreAPIConfig.bookStoreId}/books/${itemIdToDelete}`, {
      data: {
        item_id: itemIdToDelete,
      },
    });
    return itemIdToDelete;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Error deleting book: ${error.message}`);
  }
});

const bookstoreActions = {
  getBooksList,
  handleAddBook,
  handleRemoveBook,
};

export default bookstoreActions;
