import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBook: (state, action) => action.payload,
  },
});

export const { setBook } = booksSlice.actions;

export default booksSlice.reducer;
