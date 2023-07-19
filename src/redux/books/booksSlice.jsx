import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: // Initial state:
  [
    {
      itemId: 1,
      title: 'The Great Gatsby',
      author: 'John Smith',
      category: 'Fiction',
    },
    {
      itemId: 2,
      title: 'Anna Karenina',
      author: 'Leo Tolstoy',
      category: 'Fiction',
    },
    {
      itemId: 3,
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      category: 'Nonfiction',
    },
  ],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
      // imer library changes the state directly
    },
    removeBook: (state, action) => {
      const bookId = action.payload;
      return state.filter((book) => book.itemId !== bookId);
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;
// actions is a property of the createslice and returns 2 actions(is not the same that the reducers)
export default booksSlice.reducer;
