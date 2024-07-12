import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@redux/store';
import { logIn } from '@redux/auth/operations';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<ILoginForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      // localStorage.removeItem('contactFormValues');
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
