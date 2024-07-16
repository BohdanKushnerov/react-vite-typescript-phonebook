import type { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getToken } from '@redux/auth/selectors';

interface IPrivateRouteProps {
  component: ComponentType;
  redirectTo?: string;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const token = useSelector(getToken);

  return token ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
