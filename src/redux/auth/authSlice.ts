import { logIn, register, logOut, refreshUser } from './authOperations';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState } from './initialState';
import IUserDataLoginAndRegister from '@interfaces/auth/IUserDataLoginAndRegister';
import IUserDataRefreshUser from '@interfaces/auth/IUserDataRefreshUser';

type User = {
  name: string | null;
  email: string | null;
};

type AuthState = {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
};

const handleAuthFulfilled = (
  state: AuthState,
  action: PayloadAction<IUserDataLoginAndRegister>
) => {
  console.log('handleAuthFulfilled', action);
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.error = null;
};

const handleLogOutFulfilled = (state: AuthState) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
  state.error = null;
};

const handleRefreshUserPending = (state: AuthState) => {
  state.isRefreshing = true;
};

const handleRefreshUserFulfilled = (
  state: AuthState,
  action: PayloadAction<IUserDataRefreshUser>
) => {
  console.log('handleRefreshUserFulfilled', action);

  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.error = null;
};

const handleRefreshUserRejected = (
  state: AuthState,
  action: ReturnType<typeof refreshUser.rejected>
) => {
  console.log('handleRefreshUserRejected', action);
  state.isRefreshing = false;

  if (action.payload) {
    state.error = action.payload.errorMessage;
  }
};

const handleAuthRejected = (
  state: AuthState,
  action:
    | ReturnType<typeof register.rejected>
    | ReturnType<typeof logIn.rejected>
    | ReturnType<typeof logOut.rejected>
) => {
  console.log('handleAuthRejected', action);
  if (action.payload) {
    console.log('action.payload', action.payload);
    state.error = action.payload.errorMessage;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(refreshUser.pending, handleRefreshUserPending)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(refreshUser.rejected, handleRefreshUserRejected)
      .addMatcher(
        isAnyOf(register.fulfilled, logIn.fulfilled),
        handleAuthFulfilled
      )
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected, logOut.rejected),
        handleAuthRejected
      );
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
