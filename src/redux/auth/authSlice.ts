import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { initialState } from './initialState';

import type { ISetAuth } from '@interfaces/redux/auth/ISetAuth';
import type { IUser } from '@interfaces/redux/auth/IUser';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRefreshAuth: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    setAuth: (state, { payload: { user, token } }: PayloadAction<ISetAuth>) => {
      state.user = user;
      state.token = token;
    },
    setLogout: state => {
      state.user = {
        name: null,
        email: null,
      };
      state.token = null;
    },
    setResetAuth: state => {
      state.token = null;
    },
  },
});

export const { setAuth, setRefreshAuth, setLogout, setResetAuth } =
  authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
