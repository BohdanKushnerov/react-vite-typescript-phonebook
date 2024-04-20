import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from '@redux/contacts/operations';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Modal from '@components/Modal';
import { getContacts } from '@redux/contacts/selectors';
import { AppDispatch } from '@redux/store';
import { IContactProps } from '@interfaces/IContactProps';

const Contact: React.FC<IContactProps> = ({ name, number, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector(getContacts);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleDelete = async (id: string) => {
    setIsButtonDisabled(true);
    await dispatch(deleteContacts({ id }));
    setIsButtonDisabled(false);
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
        <Avatar
        // alt={`Avatar n°${value + 1}`}
        // src={`/static/images/avatar/${value + 1}.jpg`}
        />
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
        disabled={isLoading && isButtonDisabled}
        onClick={toggleModal}
      >
        Edit
      </Button>
      <Button
        type="button"
        variant="contained"
        size="small"
        disabled={isLoading && isButtonDisabled}
        onClick={() => handleDelete(id)}
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
