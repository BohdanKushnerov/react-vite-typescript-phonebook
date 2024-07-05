import { Contact } from '@myTypes/Contact';

export const getVisibleContacts = (items: Contact[], filterState: string) =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );
