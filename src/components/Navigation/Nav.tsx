import { FC } from 'react';
import { useSelector } from 'react-redux';

import { getIsLoggedInStatus } from '@redux/auth/selectors';
import { Toolbar } from '@mui/material';
import { StyledNavLink } from './Nav.styled';

const Nav: FC = () => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);

  return (
    <Toolbar
      style={{
        display: 'flex',
        gap: 8,
      }}
    >
      <StyledNavLink to="/">Home</StyledNavLink>
      {isLoggedIn && <StyledNavLink to="/phonebook">Phonebook</StyledNavLink>}
    </Toolbar>
  );
};

export default Nav;
