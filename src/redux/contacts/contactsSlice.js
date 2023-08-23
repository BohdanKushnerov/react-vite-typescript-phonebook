import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';
import {
  fetchContacts,
  addContacts,
  changeContact,
  deleteContacts,
} from '@redux/contacts/operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledGetContacts = (state, action) => {
  state.items = action.payload;
};

const handleFulfilledAddContacts = (state, action) => {
  state.items.push(action.payload);
};

const handleFulfilledChangeContact = (state, action) => {
  const index = state.items.findIndex(item => item.id === action.payload.id);
  state.items.splice(index, 1, action.payload);
};

const handleFulfilledDeleteContacts = (state, action) => {
  state.items = state.items.filter(contact => contact.id !== action.payload.id);
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const arrThunk = [fetchContacts, addContacts, changeContact, deleteContacts];

const createThunk = type => {
  return arrThunk.map(el => el[type]);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGetContacts)
      .addCase(addContacts.fulfilled, handleFulfilledAddContacts)
      .addCase(changeContact.fulfilled, handleFulfilledChangeContact)
      .addCase(deleteContacts.fulfilled, handleFulfilledDeleteContacts)
      .addMatcher(isAnyOf(...createThunk('pending')), handlePending)
      .addMatcher(isAnyOf(...createThunk('rejected')), handleRejected)
      .addMatcher(isAnyOf(...createThunk('fulfilled')), handleFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;
