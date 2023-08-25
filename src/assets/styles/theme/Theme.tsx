import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // main: '#1976D2',
      main: '#70bd7c',
      // light: '#ffffff',
      contrastText: '#000000',
    },
    action: {
      active: '#4d8b51',
      // hover: '#4d8b51',
    },
    // text: {
    //   primary: '#ddf507',
    // },
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
      // hover: '#4d8b51',
    },
    // text: {
    //   primary: '#d10023',
    // },
    background: {
      default: '#121212',
    },
  },
});

type ToggleColorModeProps = {
  children: React.ReactNode;
};

export function ToggleColorMode({ children }: ToggleColorModeProps) {
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme !== null ? JSON.parse(storedTheme) : 'light';
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  React.useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(mode));
  }, [mode]);

  const colorMode = React.useMemo(
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
