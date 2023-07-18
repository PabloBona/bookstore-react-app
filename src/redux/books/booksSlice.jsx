import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
      // imer library changes the state directly
    },
    removeBook: (state, action) => {
      state.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;
// actions is a property of the createslice and returns 2 actions(is not the same that the reducers)
export default booksSlice.reducer;
