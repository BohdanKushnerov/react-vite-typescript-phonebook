import { Contact } from '@myTypes/Contact';

export const getFilteredContacts = (items: Contact[], filterState: string) =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );
