import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '@redux/auth/operations';
import { Form, MainButton } from '@assets/styles/common';
import { AppDispatch } from '@redux/store';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        return setName(value);

      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        id="register-name-outlined-controlled"
        label="Username"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        id="register-email-outlined-controlled"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        id="register-password-outlined-controlled"
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <MainButton variant="contained" type="submit">
        Register
      </MainButton>
    </Form>
  );
}
