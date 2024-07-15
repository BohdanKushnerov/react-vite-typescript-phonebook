import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '@components/ContactForm';
import ContactList from '@components/Contacts/ContactList';
import Filter from '@components/Filter/Filter';
import ScrollTopButton from '@components/ScrollTop';

import { fetchContacts } from '@redux/contacts/operations';
import { getContacts } from '@redux/contacts/selectors';
import type { AppDispatch } from '@redux/store';

import { PageContainer } from '@assets/styles/common';
import { LocalStorageValues } from '@enums/localStorageValues';

const Phonebook = () => {
  const { error } = useSelector(getContacts);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchContacts());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

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
      {error && <p>{error}</p>}
      <ScrollTopButton />
    </PageContainer>
  );
};

export default Phonebook;
