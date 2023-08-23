import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export function ToggleColorMode({ children }) {
  const [mode, setMode] = React.useState(() => {
    return JSON.parse(localStorage.getItem('theme')) ?? 'light';
  });

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

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          colors: {
            dark: '#121212',
            white: '#ffffff',
          },
          primary: {
            main: '#70bd7c',
          },
          button: {
            black: '#000000',
            main: '#ffffff',
            dark: '#3c3f3c',
            bcg: '#70bd7c',
            bcgDark: '#f5f5f5',
            hover: '#4d8b51',
            hoverDark: '#8a8a8a',
          },
          secondaryBtn: {
            black: '#000000',
            main: '#ffffff',
            bcg: '#38583a',
            bcgDark: '#b6b0b0',
            hoverDark: '#3c3f3c',
            hover: '#304930',
          },
        },
      }),
    [mode]
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
