import { createSlice } from '@reduxjs/toolkit';
import { filterInitialState } from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilter: (state, action) => {
      return { ...state, filter: action.payload };
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
