import { Toolbar } from '@mui/material';
import { StyledNavLink } from '@components/Navigation/Nav.styled';

const AuthNav: React.FC = () => {
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
