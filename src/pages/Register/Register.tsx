import type { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { z } from 'zod';

import { authApi } from '@redux/auth/authApi';
import { setAuth } from '@redux/auth/authSlice';
import type { AppDispatch } from '@redux/store';

import { useFormWithValidation } from '@hooks/useFormWithValidation';

import { TextField } from '@mui/material';

import { FormsMessages } from '@enums/formsMessages';

import { Form, MainButton } from '@assets/styles/common';

const registerSchema = z.object({
  name: z.string().min(3, FormsMessages.ShortName),
  email: z.string().email(FormsMessages.InvalidEmailAddress),
  password: z.string().min(6, FormsMessages.ShortPassword),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [registerTrigger] = authApi.useRegisterMutation();

  const { register, errors, handleSubmit, reset } =
    useFormWithValidation<RegisterFormValues>(registerSchema, {
      name: '',
      email: '',
      password: '',
    });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<RegisterFormValues> = async data => {
    const { name, email, password } = data;
    try {
      const registerInfo = await registerTrigger({
        name,
        email,
        password,
      }).unwrap();
      dispatch(setAuth(registerInfo));
      reset();
      toast.info(
        <span>
          Hello, you have successfully registered -
          <b>{registerInfo.user.name}</b>
        </span>
      );
    } catch (error) {
      console.log('register', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        Register
      </MainButton>
    </Form>
  );
};

export default Register;
