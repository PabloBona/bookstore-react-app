import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import bookstoreActions from './bookApi';
import bookFormatter from './bookFormatter';

const initialState = {
  books: [],
  isLoading: true,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => ({
      ...state,
      books: [...state.books, action.payload],
    }),
    removeBook: (state, action) => ({
      ...state,
      books: state.books.filter((book) => book.item_id !== action.payload),
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(bookstoreActions.getBooksList.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        books: Object.keys(action.payload).map((key) => bookFormatter(action.payload[key], key)),
      }))
      .addCase(bookstoreActions.handleAddBook.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        books: [...state.books, action.payload],
      }))
      .addCase(bookstoreActions.handleRemoveBook.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        books: state.books.filter((book) => book.item_id !== action.payload),
      }))
      .addMatcher(
        isAnyOf(
          bookstoreActions.getBooksList.pending,
          bookstoreActions.handleAddBook.pending,
          bookstoreActions.handleRemoveBook.pending,
        ),
        (state) => ({
          ...state,
          isLoading: true,
        }),
      )
      .addMatcher(
        isAnyOf(
          bookstoreActions.getBooksList.rejected,
          bookstoreActions.handleAddBook.rejected,
          bookstoreActions.handleRemoveBook.rejected,
        ),
        (state, action) => ({
          ...state,
          isLoading: false,
          error: action.payload,
        }),
      );
  },
});

export const { addBook, removeBook } = booksSlice.actions;

export default booksSlice.reducer;
