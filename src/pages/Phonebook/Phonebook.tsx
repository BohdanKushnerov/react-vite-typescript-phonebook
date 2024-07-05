import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '@components/ContactForm';
import Filter from '@components/Filter';
import ContactList from '@components/Contacts/ContactList';
import ScrollTopButton from '@components/ScrollTop';
import { AppDispatch } from '@redux/store';
import { fetchContacts } from '@redux/contacts/operations';
import { getContacts } from '@redux/contacts/selectors';
import { PageContainer } from '@assets/styles/common';

const Phonebook = () => {
  const { error } = useSelector(getContacts);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchContacts());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

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
