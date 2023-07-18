import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: 'Under construction',
  reducers: {
    checkStatus: (state) => ({ ...state, status: 'Under construction' }),
  },
});

export const { checkStatus } = categoriesSlice.actions;
export default categoriesSlice.reducer;
