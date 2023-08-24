import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

// const theme = React.useMemo(
//   () =>
//     createTheme({
//       palette: {
//         mode,
//         primary: {
//           main: '#70bd7c',
//           dark: '#121212',
//           light: '#ffffff',
//           contrastText: '#000000',
//         },
//         secondary: {
//           main: '#3c3f3c',
//           dark: '#000000',
//           light: '#f5f5f5',
//           contrastText: '#FFFFFF',
//         },
//         action: {
//           active: '#304930',
//           hover: '#4d8b51',
//         },
//         background: {
//           default: '#38583a',
//           paper: '#3c3f3c',
//         },
//         // button: {
//         //   hoverDark: '#8a8a8a',
//         // },
//         // secondaryBtn: {
//         //   bcgDark: '#b6b0b0',
//         //   hoverDark: '#3c3f3c',
//         // },
//       },
//     }),
//   [mode]
// );

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
