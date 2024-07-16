import type { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { z } from 'zod';

import { authApi } from '@redux/auth/authApi';
import { setAuth } from '@redux/auth/authSlice';

// import type { AppDispatch } from '@redux/(old)/store';
// import { logIn } from '@redux/auth@redux/store
import { useFormWithValidation } from '@hooks/useFormWithValidation';

import { TextField } from '@mui/material';

import { FormsMessages } from '@enums/formsMessages';

import { Form, MainButton } from '@assets/styles/common';

const loginSchema = z.object({
  email: z.string().email(FormsMessages.InvalidEmailAddress),
  password: z.string().min(6, FormsMessages.ShortPassword),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [login, { data, isSuccess }] = authApi.useLoginMutation();
  const { register, errors, handleSubmit } =
    useFormWithValidation<LoginFormValues>(loginSchema, {
      email: '',
      password: '',
    });

  const dispatch = useDispatch();

  console.log('data, isSuccess', data, isSuccess);

  const onSubmit: SubmitHandler<LoginFormValues> = async data => {
    const { email, password } = data;
    try {
      const user = await login({ email, password }).unwrap();
      console.log('user', user);
      dispatch(setAuth(user));
    } catch (error) {
      console.log(error);
    }
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
