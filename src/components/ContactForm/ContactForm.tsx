import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

// import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { contactsApi } from '@redux/contacts/contactsApi';

// import type { AppDispatch } from '@redux/(old)/store';
// import { addContacts, changeContact } from '@redux/contacts/operations';
import { useFormWithValidation } from '@hooks/useFormWithValidation';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { FormsMessages } from '@enums/formsMessages';
import { RegexPatterns } from '@enums/regexPatterns';

import { Form, MainButton } from '@assets/styles/common';

const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: FormsMessages.NameIsRequired })
    .regex(new RegExp(RegexPatterns.NamePattern), {
      message: FormsMessages.InvalidNameFormat,
    }),
  number: z
    .string()
    .min(1, { message: FormsMessages.NumberIsRequired })
    .regex(new RegExp(RegexPatterns.NumberPattern), {
      message: FormsMessages.InvalidNumberFormat,
    }),
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
  const [addContact, { data, isSuccess }] = contactsApi.useAddContactMutation();
  const [
    changeContact,
    { data: dataChangeContact, isSuccess: isSuccessChangeContact },
  ] = contactsApi.useChangeContactMutation();
  const { register, errors, handleSubmit } =
    useFormWithValidation<ContactFormValues>(contactSchema, {
      name: initialName,
      number: initialNumber,
    });

  // const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<ContactFormValues> = async data => {
    const { name, number } = data;

    if (isChangeContact) {
      try {
        changeContact({ id, name, number });
        onClose();
      } catch (error) {
        console.log('changeContact', error);
      }
    } else {
      try {
        addContact({ name, number });
      } catch (error) {
        console.log('addContact', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          fullWidth
          {...register('name')}
          label="Name"
          type="text"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          {...register('number')}
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
