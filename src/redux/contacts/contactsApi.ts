import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@redux/store';

import type { IContact } from '@interfaces/redux/contacts/IContact';
import type { IContactWithoutId } from '@interfaces/redux/contacts/IContactWithoutId';

import type { Contact } from 'types/Contact';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query<Contact[], void>({
      query: () => '/contacts',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contacts', id }) as const),
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation<IContact, IContactWithoutId>({
      query: credentials => ({
        url: '/contacts',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContacts: builder.mutation<IContact, string>({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => {
        if (result) {
          return [{ type: 'Contacts', id: result.id }];
        } else {
          return [{ type: 'Contacts', id: 'LIST' }];
        }
      },
    }),
    changeContact: builder.mutation<IContact, IContact>({
      query: ({ id, name, number }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: result => {
        if (result) {
          return [{ type: 'Contacts', id: result.id }];
        } else {
          return [{ type: 'Contacts', id: 'LIST' }];
        }
      },
    }),
  }),
});
