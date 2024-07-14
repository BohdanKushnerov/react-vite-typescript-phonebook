import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { ContactMUIList } from './ContactList.styled';

import Contact from '../Contact';

import { getContacts, getFilter } from '@redux/contacts/selectors';

import { getFilteredContacts } from '@utils/getFilteredContacts';

const ContactList: FC = () => {
  const filterState = useSelector(getFilter);
  const { items, isLoading } = useSelector(getContacts);

  const filteredContacts = getFilteredContacts(items, filterState);

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {items.length > 0 && (
        <ContactMUIList>
          {filteredContacts.map(({ id, name, number }) => {
            return <Contact key={id} name={name} number={number} id={id} />;
          })}
        </ContactMUIList>
      )}
    </>
  );
};

export default ContactList;
