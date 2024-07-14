import { useEffect } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

import { getAuthError, getIsRefreshingStatus } from '@redux/auth/selectors';
import {
  getContactsError,
  getIsLoadingContactsStatus,
} from '@redux/contacts/selectors';

export const useFormWithValidation = <T extends Record<string, string>>(
  schema: ZodSchema<T>,
  defaultValues: UseFormProps<T>['defaultValues']
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<T>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const authError = useSelector(getAuthError);
  const isRefreshing = useSelector(getIsRefreshingStatus);
  const isLoadingContacts = useSelector(getIsLoadingContactsStatus);
  const contactsError = useSelector(getContactsError);

  useEffect(() => {
    if (
      isSubmitSuccessful &&
      !authError &&
      !isRefreshing &&
      !isLoadingContacts &&
      !contactsError
    ) {
      reset();
    }
  }, [
    authError,
    contactsError,
    isLoadingContacts,
    isRefreshing,
    isSubmitSuccessful,
    reset,
  ]);

  return {
    register,
    errors,
    handleSubmit,
  };
};
