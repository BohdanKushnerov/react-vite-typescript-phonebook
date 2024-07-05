import { FC } from 'react';
import { useSelector } from 'react-redux';

import Contact from '../Contact';
import { ContactMUIList } from './ContactList.styled';
import { getContacts, getFilter } from '@redux/contacts/selectors';
import { getVisibleContacts } from '@utils/getVisibleContacts';

const ContactList: FC = () => {
  const filterState = useSelector(getFilter);
  const { items, isLoading } = useSelector(getContacts);

  const visibleContacts = getVisibleContacts(items, filterState);

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {items.length > 0 && (
        <ContactMUIList>
          {visibleContacts.map(({ id, name, number }) => {
            return <Contact key={id} name={name} number={number} id={id} />;
          })}
        </ContactMUIList>
      )}
    </>
  );
};

export default ContactList;
