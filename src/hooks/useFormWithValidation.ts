import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

export const useFormWithValidation = <T extends Record<string, string>>(
  schema: ZodSchema<T>,
  defaultValues: UseFormProps<T>['defaultValues']
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  });

  return {
    register,
    errors,
    handleSubmit,
    reset,
  };
};
