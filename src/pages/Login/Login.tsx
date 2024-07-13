import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppDispatch } from '@redux/store';
import { getAuthError, getIsRefreshingStatus } from '@redux/auth/selectors';
import { logIn } from '@redux/auth/operations';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';

interface ILoginForm {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<ILoginForm>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
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

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    const { email, password } = data;

    dispatch(logIn({ email, password }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <p>Email: "mytest@mail.com"</p>
        <p>Password:"qwerty123"</p>
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
          Log In
        </MainButton>
      </Form>
    </>
  );
};

export default Login;
