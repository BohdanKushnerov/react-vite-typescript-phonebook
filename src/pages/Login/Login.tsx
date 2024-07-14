import { z } from 'zod';

import { useFormWithValidation } from '@hooks/useFormWithValidation ';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';
import { SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '@redux/store';
import { useDispatch } from 'react-redux';
import { logIn } from '@redux/auth/operations';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
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
