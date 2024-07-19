import { styled } from '@mui/material';

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,

  margin: 0,
  width: '100%',
  minWidth: 200,
  maxWidth: 400,
  marginBottom: 50,
}));
