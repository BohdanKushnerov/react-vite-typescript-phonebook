import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';
import { IUserDataLoginAndRegister } from '@interfaces/redux/auth/IUserDataLoginAndRegister';
import { IUserDataRefreshUser } from '@interfaces/redux/auth/IUserDataRefreshUser';
import { IRegisterCredentials } from '@interfaces/redux/auth/IRegisterCredentials';
import { ILoginCredentials } from '@interfaces/redux/auth/ILoginCredentials';
import { IMyKnownError } from '@interfaces/redux/auth/IMyKnownError';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = token;
};
const unSetToken = (): void => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk<
  IUserDataLoginAndRegister,
  IRegisterCredentials,
  { rejectValue: IMyKnownError }
>('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', credentials);

    setToken(response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});

export const logIn = createAsyncThunk<
  IUserDataLoginAndRegister,
  ILoginCredentials,
  { rejectValue: IMyKnownError }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', credentials);

    setToken(response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});

export const logOut = createAsyncThunk<
  void,
  void,
  { rejectValue: IMyKnownError }
>('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');

    unSetToken();
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});

export const refreshUser = createAsyncThunk<
  IUserDataRefreshUser,
  void,
  { rejectValue: IMyKnownError }
>('auth/refreshUser', async (_, thunkAPI) => {
  const { token } = (thunkAPI.getState() as RootState).auth;

  if (!token) {
    return thunkAPI.rejectWithValue({
      errorMessage: 'No token available.',
    });
  }

  try {
    setToken(token);

    const response = await axios.get('/users/current', {
      signal: thunkAPI.signal,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
});
