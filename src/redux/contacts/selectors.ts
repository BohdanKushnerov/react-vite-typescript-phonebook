import type { RootState } from '@redux/store';

export const getFilter = (state: RootState) => state.filter.filter;
export const getContacts = (state: RootState) => state.contacts;
export const getIsLoadingContactsStatus = (state: RootState) =>
  state.contacts.isLoading;
export const getContactsError = (state: RootState) => state.contacts.error;
