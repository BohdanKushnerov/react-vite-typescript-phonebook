import Contact from '../Contact';
import { ContactMUIList } from './ContactList.styled';
import { getContacts, getFilter } from '@redux/contacts/selectors';
import { useSelector } from 'react-redux';

type Contact = {
  id: string;
  name: string;
  number: string;
};

type ContactsItems = Contact[];

type FilterValue = string;

const getVisibleContacts = (
  items: ContactsItems,
  filterState: FilterValue
): ContactsItems =>
  items.filter(({ name }) =>
    name.toLowerCase().includes(filterState.toLowerCase())
  );

const ContactList: React.FC = () => {
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
