import { useDispatch } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { AppDispatch } from '@redux/store';
import { register as registerOperation } from '@redux/auth/operations';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';
import { useFormWithValidation } from '@hooks/useFormWithValidation ';

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, errors, handleSubmit } =
    useFormWithValidation<RegisterFormValues>(registerSchema, {
      name: '',
      email: '',
      password: '',
    });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<RegisterFormValues> = data => {
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
