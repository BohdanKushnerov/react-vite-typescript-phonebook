import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



import { initialState } from './initialState';



import type { IUser } from '@interfaces/redux/auth/IUser';


interface ISetAuth {
  user: IUser;
  token: string;
}

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
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(logOut.fulfilled, state => {
  //       state.user = { name: null, email: null };
  //       state.token = null;
  //       state.isLoggedIn = false;
  //       state.error = null;
  //     })
  //     .addCase(refreshUser.fulfilled, (state, action) => {
  //       state.isRefreshing = false;
  //       state.user = action.payload;
  //       state.isLoggedIn = true;
  //       state.error = null;
  //     })
  //     .addMatcher(
  //       isAnyOf(refreshUser.pending, register.pending, logIn.pending),
  //       state => {
  //         state.isRefreshing = true;
  //       }
  //     )
  //     .addMatcher(
  //       isAnyOf(register.fulfilled, logIn.fulfilled),
  //       (state, action) => {
  //         state.isRefreshing = false;
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.isLoggedIn = true;
  //         state.error = null;
  //       }
  //     )
  //     .addMatcher(
  //       isAnyOf(
  //         refreshUser.rejected,
  //         register.rejected,
  //         logIn.rejected,
  //         logOut.rejected
  //       ),
  //       (state, action) => {
  //         state.isRefreshing = false;

  //         if (action.payload) {
  //           state.error = action.payload.errorMessage;
  //         }
  //       }
  //     );
  // },
});

export const { setAuth, setRefreshAuth, setLogout } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);