import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { addContacts, changeContact } from '@redux/contacts/operations';
import { AppDispatch } from '@redux/store';
import { getContacts } from '@redux/contacts/selectors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Contact } from '@myTypes/Contact';
import { MainButton } from '@assets/styles/common';
import { Form } from '@assets/styles/common';

interface IContactFormProps {
  name?: string;
  number?: string;
  isChangeContact?: boolean;
  id?: string;
  onClose?: () => void;
}

const ContactForm: FC<IContactFormProps> = ({
  name: initialName = '',
  number: initialNumber = '',
  isChangeContact = false,
  id = '',
  onClose = () => {},
}) => {
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector(getContacts);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isIncludes = items.find(
      (contact: Contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isChangeContact) {
      dispatch(changeContact({ id, name, number }));
      onClose();
    } else {
      if (isIncludes) {
        toast.error(
          <span>
            <b>{name}</b> is already in contacts
          </span>
        );
      } else {
        dispatch(addContacts({ name, number }));
      }
      reset();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box>
        <TextField
          fullWidth
          id="name-outlined-controlled"
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          inputProps={{
            pattern: /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я]*)*$/,
            title:
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            required: true,
          }}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          id="number-outlined-controlled"
          label="Phone"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          inputProps={{
            pattern:
              /^\+?\d{0,3}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/,
            title:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            required: true,
          }}
          autoComplete="on"
        />
      </Box>

      <MainButton variant="contained" type="submit">
        {isChangeContact ? 'Save' : 'Add contact'}
      </MainButton>
    </Form>
  );
};

export default ContactForm;
