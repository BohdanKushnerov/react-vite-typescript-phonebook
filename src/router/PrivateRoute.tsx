import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getAuthName, getToken } from '@redux/auth/selectors';

interface IPrivateRouteProps {
  component: ComponentType;
  redirectTo?: string;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const token = useSelector(getToken);
  const authName = useSelector(getAuthName);

  const shouldRedirect = token && authName;

  return shouldRedirect ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
