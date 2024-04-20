import { createPortal } from 'react-dom';
import { useCloseModal } from '@hooks/useCloseModal';
import ContactForm from '@components/ContactForm';
import { Overlay } from './Modal.styled';
import { IModalProps } from '@interfaces/IModalProps';

const modalRoot = document.querySelector('#modal-root')!;

const Modal: React.FC<IModalProps> = ({ id, name, number, onClose }) => {
  useCloseModal(onClose);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
