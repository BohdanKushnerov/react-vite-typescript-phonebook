import type { FC } from 'react';
import { useState } from 'react';

import Modal from '@components/Modal';

import { contactsApi } from '@redux/contacts/contactsApi';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface IContactProps {
  name: string;
  number: string;
  id: string;
}

const Contact: FC<IContactProps> = ({ name, number, id }) => {
  const [deleteTrigger, { data, isSuccess }] =
    contactsApi.useDeleteContactsMutation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const deleteItem = await deleteTrigger(id).unwrap();
      console.log('deleteItem', deleteItem);
    } catch (error) {
      console.log('handleDeleteContact', handleDeleteContact);
    }
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        gap: 1,
        minWidth: 350,
        maxWidth: 450,
        border: '1px solid grey',
        borderRadius: 2,
        '& .MuiListItemText-primary': {
          fontWeight: 'bold',
        },
      }}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <p>{number}</p>
      </ListItemText>
      <Button
        type="button"
        variant="contained"
        size="small"
        // disabled={isLoading && isButtonDisabled}
        onClick={toggleModal}
      >
        Edit
      </Button>
      <Button
        type="button"
        variant="contained"
        size="small"
        // disabled={isLoading && isButtonDisabled}
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </Button>
      {showModal && (
        <Modal id={id} name={name} number={number} onClose={toggleModal} />
      )}
    </ListItem>
  );
};

export default Contact;
