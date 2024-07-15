import type { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { z } from 'zod';

import { logIn } from '@redux/auth/operations';
import type { AppDispatch } from '@redux/store';

import { useFormWithValidation } from '@hooks/useFormWithValidation ';

import { TextField } from '@mui/material';

import { FormsMessages } from '@enums/formsMessages';

import { Form, MainButton } from '@assets/styles/common';

const loginSchema = z.object({
  email: z.string().email(FormsMessages.InvalidEmailAddress),
  password: z.string().min(6, FormsMessages.ShortPassword),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { register, errors, handleSubmit } =
    useFormWithValidation<LoginFormValues>(loginSchema, {
      email: '',
      password: '',
    });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
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
          {...register('email')}
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          fullWidth
          {...register('password')}
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
