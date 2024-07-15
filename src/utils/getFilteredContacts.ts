import type { Contact } from 'types/Contact';

export const getFilteredContacts = (items: Contact[], filterState: string) =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );
