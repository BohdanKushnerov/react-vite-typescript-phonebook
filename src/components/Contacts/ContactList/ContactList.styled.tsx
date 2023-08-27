import { styled } from '@mui/material';
import List from '@mui/material/List';

export const ContactMUIList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  minWidth: 350,
  maxWidth: 450,
}));
