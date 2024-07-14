import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import type { RootState } from '@redux/store';

import type { IMyKnownError } from '@interfaces/redux/auth/IMyKnownError';
import type { IContact } from '@interfaces/redux/contacts/IContact';
import type { IContactWithoutId } from '@interfaces/redux/contacts/IContactWithoutId';
import type { IDeleteContactId } from '@interfaces/redux/contacts/IDeleteContactId';

import type { Contact } from '@myTypes/Contact';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      }
    }
  }
);

export const addContacts = createAsyncThunk<
  IContact,
  IContactWithoutId,
  { rejectValue: IMyKnownError; state: RootState }
>('contacts/addContacts', async ({ name, number }, thunkAPI) => {
  try {
    const items = thunkAPI.getState().contacts.items;

    const isIncludes = items.find(
      (contact: Contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isIncludes) {
      throw new Error('Contact is already in phone');
    }

    const response = await axios.post(`/contacts`, { name, number });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError || error instanceof Error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});

export const changeContact = createAsyncThunk<
  IContact,
  IContact,
  { rejectValue: IMyKnownError }
>('contacts/changeContact', async ({ id, name, number }, thunkAPI) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, { name, number });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});

export const deleteContacts = createAsyncThunk<
  IContact,
  IDeleteContactId,
  { rejectValue: IMyKnownError }
>('contacts/deleteContacts', async ({ id }, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});
