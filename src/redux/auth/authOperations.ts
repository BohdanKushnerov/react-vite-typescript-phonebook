import ILoginCredentials from '@interfaces/auth/ILoginCredentials';
import IMyKnownError from '@interfaces/auth/IMyKnownError';
import IRegisterCredentials from '@interfaces/auth/IRegisterCredentials';
import IUserDataLogOut from '@interfaces/auth/IUserDataLogOut';
import IUserDataLoginAndRegister from '@interfaces/auth/IUserDataLoginAndRegister';
import IUserDataRefreshUser from '@interfaces/auth/IUserDataRefreshUser';
import { RootState } from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = token;
};
const unSetToken = (): void => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk<
  IUserDataLoginAndRegister,
  { credentials: IRegisterCredentials },
  { rejectValue: IMyKnownError }
>('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', credentials);
    console.log('credentials', credentials);
    console.log('response Register', response);

    setToken(response.data.token);
    return response.data as IUserDataLoginAndRegister;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
  }
});

export const logIn = createAsyncThunk<
  IUserDataLoginAndRegister,
  { credentials: ILoginCredentials },
  { rejectValue: IMyKnownError }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', credentials);

    console.log('credentials', credentials);
    console.log('response login', response);

    setToken(response.data.token);
    return response.data as IUserDataLoginAndRegister;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
  }
});

export const logOut = createAsyncThunk<
  IUserDataLogOut,
  void,
  { rejectValue: IMyKnownError }
>('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');

    console.log('response', response);

    unSetToken();
    return response.data as IUserDataLogOut;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
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

    console.log('response.data', response.data);
    return response.data as IUserDataRefreshUser;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorMessage:
        error instanceof AxiosError
          ? error.message
          : 'An unknown error occurred',
    });
  }
});
