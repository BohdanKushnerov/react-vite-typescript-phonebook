import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

import type { PaletteMode } from '@mui/material';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

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
      main: '#7ab87a',
      contrastText: '#ffffff',
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
    return (storedTheme !== null ? storedTheme : 'light') as PaletteMode;
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    window.localStorage.setItem('theme', mode);
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
