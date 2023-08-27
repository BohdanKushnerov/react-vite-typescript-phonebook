import IMyKnownError from '@interfaces/redux/IMyKnownError';
import IContact from '@interfaces/redux/contacts/IContact';
import { IContactWithoutId } from '@interfaces/redux/contacts/IContactWithoutId';
import IDeleteContactId from '@interfaces/redux/contacts/IDeleteContactId';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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
  { rejectValue: IMyKnownError }
>('contacts/addContacts', async ({ name, number }, thunkAPI) => {
  try {
    const response = await axios.post(`/contacts`, { name, number });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
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
