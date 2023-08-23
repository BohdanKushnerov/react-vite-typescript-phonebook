import { styled } from '@mui/material';

export const UserMenuBtn = styled('button')(({ theme }) => ({
  padding: 4,

  width: 70,

  textDecoration: 'none',
  fontWeight: 'bold',
  borderRadius: 6,
  border: '1px solid #3c3f3c',

  cursor: 'pointer',

  color: theme.palette.secondaryBtn.main,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.secondaryBtn.bcgDark
      : theme.palette.secondaryBtn.bcg,

  '&:hover': {
    color: '#ffffff',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.button.hoverDark
        : theme.palette.button.hover,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '1px 1px 6px rgba(255,255,255,.12), 1px 1px 3px rgba(255,255,255,.14), 1px 1px 3px rgba(255,255,255,.2)'
        : '1px 1px 6px rgba(0,0,0,.12), 1px 1px 3px rgba(0,0,0,.14), 1px 1px 3px rgba(0,0,0,.2)',
  },
}));
