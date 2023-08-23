import Contact from '../Contact';
import { ContactMUIList } from './ContactList.styled';
import { getContacts, getFilter } from '@redux/contacts/selectors';
import { useSelector } from 'react-redux';

const getVisibleContacts = (items, filterState) =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );

const ContactList = () => {
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
