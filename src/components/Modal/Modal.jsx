import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useCloseModal } from '@hooks';
import ContactForm from '@components/ContactForm';
import { Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ id, name, number, onClose }) => {
  useCloseModal(onClose);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onMouseDown={handleBackdropClick}>
      <h1>Edit contact</h1>
      <ContactForm
        name={name}
        number={number}
        isChangeContact={true}
        id={id}
        onClose={onClose}
      />
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
