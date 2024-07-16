import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Contact } from 'types/Contact';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.goit.global' }),
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
  }),
});
