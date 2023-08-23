import { styled } from '@mui/material/styles';

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 16,

  margin: '0 auto',
  width: '100%',
  minWidth: 200,
  maxWidth: 400,
  marginBottom: 50,
}));
