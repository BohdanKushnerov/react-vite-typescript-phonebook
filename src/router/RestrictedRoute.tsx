import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getToken } from '@redux/auth/selectors';

interface IRestrictedRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const token = useSelector(getToken);

  return token ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
