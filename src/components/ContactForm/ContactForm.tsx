import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';

import { AppDispatch } from '@redux/store';
import { addContacts, changeContact } from '@redux/contacts/operations';
import { useFormWithValidation } from '@hooks/useFormWithValidation ';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Form, MainButton } from '@assets/styles/common';

const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+([' -][a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$/, {
      message: 'Invalid name format',
    }),
  number: z
    .string()
    .min(1, { message: 'Number is required' })
    .regex(
      /^\+?\d{0,3}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/,
      {
        message: 'Invalid number format',
      }
    ),
});

type ContactFormValues = z.infer<typeof contactSchema>;

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
  const { register, errors, handleSubmit } =
    useFormWithValidation<ContactFormValues>(contactSchema, {
      name: initialName,
      number: initialNumber,
    });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<ContactFormValues> = data => {
    const { name, number } = data;

    if (isChangeContact) {
      dispatch(changeContact({ id, name, number }));
      onClose();
    } else {
      dispatch(addContacts({ name, number }));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          fullWidth
          {...register('name', { required: 'Name is required' })}
          label="Name"
          type="text"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          {...register('number', { required: 'Number is required' })}
          label="Number"
          type="tel"
          error={!!errors.number}
          helperText={errors.number ? errors.number.message : ''}
        />
      </Box>

      <MainButton variant="contained" type="submit">
        {isChangeContact ? 'Save' : 'Add contact'}
      </MainButton>
    </Form>
  );
};

export default ContactForm;
