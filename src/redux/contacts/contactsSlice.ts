import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';
import {
  fetchContacts,
  addContacts,
  changeContact,
  deleteContacts,
} from '@redux/contacts/operations';

type CreateThunkValue = 'pending' | 'rejected' | 'fulfilled';

const arrThunk = [fetchContacts, addContacts, changeContact, deleteContacts];

const createThunk = (type: CreateThunkValue) => {
  return arrThunk.map(el => el[type]);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(changeContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => 'id' in item && item.id === action.payload.id
        );

        if (index !== -1) {
          const updatedItem = action.payload;
          state.items.splice(index, 1, updatedItem);
        }
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => {
          if ('id' in contact) {
            return contact.id !== action.payload.id;
          }
          return true;
        });
      })
      .addMatcher(isAnyOf(...createThunk('pending')), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...createThunk('rejected')), (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
      })
      .addMatcher(isAnyOf(...createThunk('fulfilled')), state => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
