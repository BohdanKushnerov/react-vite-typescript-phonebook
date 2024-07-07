import { FC, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import ContactForm from '@components/ContactForm';
import { useCloseModal } from '@hooks/useCloseModal';
import { Overlay } from './Modal.styled';

interface IModalProps {
  id: string;
  name: string;
  number: string;
  onClose: () => void;
}

const modalRoot = document.querySelector('#modal-root')!;

const Modal: FC<IModalProps> = ({ id, name, number, onClose }) => {
  useCloseModal(onClose);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
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

export default Modal;
