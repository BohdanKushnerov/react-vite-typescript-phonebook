import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { z } from 'zod';

import { contactsApi } from '@redux/contacts/contactsApi';

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

const ContactForm: FC = () => {
  const [addContact, { isLoading }] = contactsApi.useAddContactMutation();

  const { register, errors, handleSubmit, reset } =
    useFormWithValidation<ContactFormValues>(contactSchema, {
      name: '',
      number: '',
    });

  const onSubmit: SubmitHandler<ContactFormValues> = async data => {
    const { name, number } = data;

    try {
      const addedItem = await addContact({ name, number }).unwrap();
      toast.success(
        <span>
          Success add - <b>{addedItem.name}</b>
        </span>
      );
      reset();
    } catch (error) {
      console.log('addContact', error);
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

      <MainButton variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? 'Adding' : 'Add contact'}
      </MainButton>
    </Form>
  );
};

export default ContactForm;
