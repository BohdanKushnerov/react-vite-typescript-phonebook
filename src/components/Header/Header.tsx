import * as React from 'react';
import { useSelector } from 'react-redux';
import { getisLoggedInStatus } from '@redux/auth/selectors';
import UserMenu from '@components/UserMenu';
import { AuthNav, Nav } from '@components/Navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../assets/styles/theme';
import { IHeaderProps } from '@interfaces/IHeaderProps';

const Header: React.FC<IHeaderProps> = ({ position }) => {
  const isLoggedIn = useSelector(getisLoggedInStatus);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={position}>
        <Toolbar component="nav">
          <Nav />
          <Toolbar sx={{ ml: 'auto' }}>
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
