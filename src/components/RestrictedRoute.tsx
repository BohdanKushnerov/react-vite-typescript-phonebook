import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getisLoggedInStatus } from '@redux/auth/selectors';

interface IRestrictedRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const RestrictedRoute: React.FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getisLoggedInStatus);

  // return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
