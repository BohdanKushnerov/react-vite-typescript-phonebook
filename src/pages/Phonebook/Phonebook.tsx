import { useEffect } from 'react';

import ContactForm from '@components/ContactForm';
import ContactList from '@components/Contacts/ContactList';
import Filter from '@components/Filter/Filter';
import ScrollTopButton from '@components/ScrollTop';

import { LocalStorageValues } from '@enums/localStorageValues';

import { PageContainer } from '@assets/styles/common';

const Phonebook = () => {
  useEffect(() => {
    localStorage.setItem(LocalStorageValues.IsPhonebookPath, 'true');
  }, []);

  return (
    <PageContainer>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      <ScrollTopButton />
    </PageContainer>
  );
};

export default Phonebook;
