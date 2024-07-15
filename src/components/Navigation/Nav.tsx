import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { StyledNavLink } from './Nav.styled';

import { getIsLoggedInStatus } from '@redux/auth/selectors';

import { Toolbar } from '@mui/material';

import { LocalStorageValues } from '@enums/localStorageValues';

const Nav: FC = () => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);

  return (
    <Toolbar
      style={{
        display: 'flex',
        gap: 8,
      }}
    >
      <StyledNavLink
        to="/"
        onClick={() =>
          localStorage.removeItem(LocalStorageValues.IsPhonebookPath)
        }
      >
        Home
      </StyledNavLink>
      {isLoggedIn && <StyledNavLink to="/phonebook">Phonebook</StyledNavLink>}
    </Toolbar>
  );
};

export default Nav;
