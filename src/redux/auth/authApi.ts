import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@redux/store';

import type { ILoginCredentials } from '@interfaces/redux/auth/ILoginCredentials';
import type { IRegisterCredentials } from '@interfaces/redux/auth/IRegisterCredentials';
import type { IUserDataLoginAndRegister } from '@interfaces/redux/auth/IUserDataLoginAndRegister';
import type { IUserDataRefreshUser } from '@interfaces/redux/auth/IUserDataRefreshUser';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.goit.global',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    refresh: builder.query<IUserDataRefreshUser, void>({
      query: () => '/users/current',
    }),
    register: builder.mutation<IUserDataLoginAndRegister, IRegisterCredentials>(
      {
        query: credentials => ({
          url: '/users/signup',
          method: 'POST',
          body: credentials,
        }),
      }
    ),
    login: builder.mutation<IUserDataLoginAndRegister, ILoginCredentials>({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
  }),
});
