import { RootState } from '@redux/store';

export const getFilter = (state: RootState) => state.filter.filter;
export const getContacts = (state: RootState) => state.contacts;
