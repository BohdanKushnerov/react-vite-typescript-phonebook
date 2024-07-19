import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAuthName, getToken } from '@redux/auth/selectors';

interface IRestrictedRouteProps {
  component: ComponentType;
  redirectTo?: string;
}

const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const token = useSelector(getToken);
  const authName = useSelector(getAuthName);

  const shouldRedirect = token && authName;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
