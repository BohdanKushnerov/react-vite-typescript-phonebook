import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppDispatch } from '@redux/store';
import { getAuthError, getIsRefreshingStatus } from '@redux/auth/selectors';
import { register as registerOperation } from '@redux/auth/operations';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<IRegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const dispatch: AppDispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const isRefreshing = useSelector(getIsRefreshingStatus);

  useEffect(() => {
    if (isSubmitSuccessful && !authError && !isRefreshing) {
      reset();
    }
  }, [authError, isRefreshing, isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    const { name, email, password } = data;

    dispatch(registerOperation({ name, email, password }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        {...register('name', { required: 'Name is required' })}
        label="Name"
        type="text"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />

      <TextField
        fullWidth
        {...register('email', { required: 'Email is required' })}
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />

      <TextField
        fullWidth
        {...register('password', { required: 'Password is required' })}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
      />

      <MainButton variant="contained" type="submit">
        Register
      </MainButton>
    </Form>
  );
};

export default Register;
