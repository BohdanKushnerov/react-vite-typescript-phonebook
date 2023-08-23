import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getisLoggedInStatus } from '@redux/auth/authSelectors';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(getisLoggedInStatus);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
