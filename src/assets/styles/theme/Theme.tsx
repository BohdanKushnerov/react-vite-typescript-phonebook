import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#70bd7c',
      contrastText: '#000000',
    },
    action: {
      active: '#4d8b51',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3c3f3c',
      contrastText: '#FFFFFF',
    },
    action: {
      active: '#8a8a8a',
    },
    background: {
      default: '#121212',
    },
  },
});

type ToggleColorModeProps = {
  children: ReactNode;
};

export function ToggleColorMode({ children }: ToggleColorModeProps) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme !== null ? JSON.parse(storedTheme) : 'light';
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(mode));
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
