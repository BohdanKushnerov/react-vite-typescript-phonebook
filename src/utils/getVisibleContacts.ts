import { ContactsItems } from '@myTypes/ContactsItems';
import { FilterValue } from '@myTypes/FilterValue';

export const getVisibleContacts = (
  items: ContactsItems,
  filterState: FilterValue
): ContactsItems =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );
