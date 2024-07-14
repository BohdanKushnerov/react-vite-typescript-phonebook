import { Button, styled } from '@mui/material';

export const UserMenuBtn = styled(Button)(({ theme }) => ({
  padding: 4,

  width: 70,

  textDecoration: 'none',
  fontWeight: 'bold',
  borderRadius: 6,
  border: '1px solid #3c3f3c',

  cursor: 'pointer',

  color: theme.palette.primary.contrastText,

  '&:hover': {
    color: '#ffffff',
    backgroundColor: theme.palette.action.active,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '1px 1px 6px rgba(255,255,255,.12), 1px 1px 3px rgba(255,255,255,.14), 1px 1px 3px rgba(255,255,255,.2)'
        : '1px 1px 6px rgba(0,0,0,.12), 1px 1px 3px rgba(0,0,0,.14), 1px 1px 3px rgba(0,0,0,.2)',
  },
}));
