import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.button.main
      : theme.palette.button.black,
  fontWeight: 'bold',
  border: '1px solid #3c3f3c',

  borderRadius: 6,

  padding: 4,

  '&.active': {
    color: '#ffffff',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.button.hoverDark
        : theme.palette.button.hover,
  },
  '&:hover': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? '1px 1px 6px rgba(255,255,255,.12), 1px 1px 3px rgba(255,255,255,.14), 1px 1px 3px rgba(255,255,255,.2)'
        : '1px 1px 6px rgba(0,0,0,.12), 1px 1px 3px rgba(0,0,0,.14), 1px 1px 3px rgba(0,0,0,.2)',
  },
}));
