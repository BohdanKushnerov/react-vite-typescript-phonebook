import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  getIsLoggedInStatus,
  getIsRefreshingStatus,
} from '@redux/auth/selectors';

interface IPrivateRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const isRefreshing = useSelector(getIsRefreshingStatus);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
