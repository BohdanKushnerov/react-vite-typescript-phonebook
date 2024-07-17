import type { FC } from 'react';

import { ContactMUIList } from './ContactList.styled';

import Contact from '../Contact';

import { contactsApi } from '@redux/contacts/contactsApi';

const ContactList: FC = () => {
  const { data, isLoading } = contactsApi.useGetAllContactsQuery();

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {data && data.length > 0 && (
        <ContactMUIList>
          {data.map(({ id, name, number }) => {
            return <Contact key={id} name={name} number={number} id={id} />;
          })}
        </ContactMUIList>
      )}
    </>
  );
};

export default ContactList;
