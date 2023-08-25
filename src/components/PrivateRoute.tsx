import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getisLoggedInStatus,
  getisRefreshingStatus,
} from '@redux/auth/authSelectors';

interface IPrivateRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(getisLoggedInStatus);
  const isRefreshing = useSelector(getisRefreshingStatus);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
