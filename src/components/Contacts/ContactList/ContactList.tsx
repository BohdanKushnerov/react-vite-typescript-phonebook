import { type FC } from 'react';

import { ContactMUIList } from './ContactList.styled';

import Contact from '../Contact';

import { contactsApi } from '@redux/contacts/contactsApi';

import { getFilteredContacts } from '@utils/getFilteredContacts';

interface IContactListProps {
  filterValue: string;
}

const ContactList: FC<IContactListProps> = ({ filterValue }) => {
  const { data, isLoading } = contactsApi.useGetAllContactsQuery();

  const filteredContacts = getFilteredContacts(data, filterValue);

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {filteredContacts && (
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
