import type { FC } from 'react';

import { StyledNavLink } from '@components/Navigation/Nav.styled';

import { Toolbar } from '@mui/material';

const AuthNav: FC = () => {
  return (
    <Toolbar
      style={{
        display: 'flex',
        gap: 8,
      }}
    >
      <StyledNavLink to="/login">Login</StyledNavLink>
      <StyledNavLink to="/register">Register</StyledNavLink>
    </Toolbar>
  );
};

export default AuthNav;
