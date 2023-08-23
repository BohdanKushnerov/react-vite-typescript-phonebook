import { Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { getisLoggedInStatus } from '@redux/auth/authSelectors';
import { StyledNavLink } from './Nav.styled';

const Nav = () => {
  const isLoggedIn = useSelector(getisLoggedInStatus);

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
