import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  getIsLoggedInStatus,
  getIsRefreshingStatus,
} from '@redux/auth/selectors';

interface IPrivateRouteProps {
  component: ComponentType;
  redirectTo?: string;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus);
  const isRefreshing = useSelector(getIsRefreshingStatus);

  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
