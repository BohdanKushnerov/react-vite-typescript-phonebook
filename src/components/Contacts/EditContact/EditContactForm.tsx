import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { z } from 'zod';

import { Form } from './EditContactForm.styled';

import { contactsApi } from '@redux/contacts/contactsApi';

import { useFormWithValidation } from '@hooks/useFormWithValidation';

import { Box, Button, ListItem, TextField } from '@mui/material';

import { FormsMessages } from '@enums/formsMessages';
import { RegexPatterns } from '@enums/regexPatterns';

import { MainButton } from '@assets/styles/common';

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

interface IEditContactFormProps {
  name: string;
  number: string;
  id: string;
  onClose: () => void;
}

const EditContactForm: FC<IEditContactFormProps> = ({
  id,
  name,
  number,
  onClose,
}) => {
  const [changeContact, { isLoading: isEditingProcess }] =
    contactsApi.useChangeContactMutation();
  const { register, errors, handleSubmit, reset } =
    useFormWithValidation<ContactFormValues>(contactSchema, {
      name: name,
      number: number,
    });

  const onSubmit: SubmitHandler<ContactFormValues> = async data => {
    const { name, number } = data;

    try {
      const editedItem = await changeContact({ id, name, number }).unwrap();
      toast.success(
        <span>
          Success change - <b>{editedItem.name}</b>
        </span>
      );
      reset();
      onClose();
    } catch (error) {
      console.log('changeContact', error);
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
      <Form sx={{ margin: 0 }} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            fullWidth
            {...register('name')}
            label="Name"
            type="text"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />

          <TextField
            fullWidth
            {...register('number')}
            label="Number"
            type="tel"
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : ''}
          />
        </Box>

        <Box>
          <MainButton
            variant="contained"
            type="submit"
            disabled={isEditingProcess}
          >
            {isEditingProcess ? 'Saving' : 'Save'}
          </MainButton>
          <Button
            variant="contained"
            onClick={() => onClose()}
            disabled={isEditingProcess}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </ListItem>
  );
};

export default EditContactForm;
