import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedInStatus } from '@redux/auth/selectors';

interface IRestrictedRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

export const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
