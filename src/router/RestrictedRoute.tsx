import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  getIsLoggedInStatus,
  getIsRefreshingStatus,
} from '@redux/auth/selectors';

interface IRestrictedRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const isRefreshing = useSelector(getIsRefreshingStatus);

  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
