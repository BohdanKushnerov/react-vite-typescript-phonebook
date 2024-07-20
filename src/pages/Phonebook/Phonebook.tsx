import type { ChangeEvent } from 'react';
import { useState } from 'react';

import ContactForm from '@components/ContactForm';
import ContactList from '@components/Contacts/ContactList';
import Filter from '@components/Filter/Filter';
import ScrollTopButton from '@components/ScrollTop';

import { PageContainer } from '@assets/styles/common';

const Phonebook = () => {
  const [filterValue, setFilterValue] = useState('');

  const handleChangeFilterValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFilterValue(value);
  };

  return (
    <PageContainer>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter
        filterValue={filterValue}
        handleChangeFilterValue={handleChangeFilterValue}
      />
      <ContactList filterValue={filterValue} />
      <ScrollTopButton />
    </PageContainer>
  );
};

export default Phonebook;
