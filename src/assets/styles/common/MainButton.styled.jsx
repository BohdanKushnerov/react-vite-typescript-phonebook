import { Button, styled } from '@mui/material';

export const MainButton = styled(Button)(({ theme }) => ({
  fontSize: 'large',
  fontWeight: 'bold',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.button.dark
      : theme.palette.button.main,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.button.bcgDark
      : theme.palette.button.bcg,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.button.hoverDark
        : theme.palette.button.hover,
  },
}));
