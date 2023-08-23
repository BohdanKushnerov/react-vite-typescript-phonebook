import { styled } from '@mui/material';

export const Overlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.colors.dark
      : theme.palette.colors.white,
  zIndex: 1200,
}));
