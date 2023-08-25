import IMyKnownError from '@interfaces/auth/IMyKnownError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface IContact {
  id: string;
  name: string;
  number: string;
}
interface IContactWithoutId extends Omit<IContact, 'id'> {}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage:
          error instanceof AxiosError
            ? error.message
            : 'An unknown error occurred',
      });
    }
  }
);

export const addContacts = createAsyncThunk<
  IContactWithoutId,
  IContactWithoutId,
  { rejectValue: IMyKnownError }
>('contacts/addContacts', async ({ name, number }, thunkAPI) => {
  try {
    const response = await axios.post(`/contacts`, { name, number });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
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
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
  }
});

export const deleteContacts = createAsyncThunk<
  {
    id: string;
    name: string;
    number: string;
  },
  { id: string },
  { rejectValue: IMyKnownError }
>('contacts/deleteContacts', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
  }
});
