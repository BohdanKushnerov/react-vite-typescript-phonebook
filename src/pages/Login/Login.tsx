import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@redux/store';
import { logIn } from '@redux/auth/operations';
import { TextField } from '@mui/material';
import { Form, MainButton } from '@assets/styles/common';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleLoginInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(logIn({ email, password }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p>Email: "mytest@mail.com"</p>
        <p>Password:"qwerty123"</p>
        <TextField
          fullWidth
          id="email-outlined-controlled"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleLoginInputsChange}
        />
        <TextField
          fullWidth
          id="password-outlined-controlled"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleLoginInputsChange}
        />
        <MainButton variant="contained" type="submit">
          Log In
        </MainButton>
      </Form>
    </>
  );
};

export default Login;
