import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import Layout from '../Layout';

import ErrorPage from '@pages/ErrorPage';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Phonebook = lazy(() => import('@pages/Phonebook'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <RestrictedRoute component={Login} redirectTo="/phonebook" />,
      },
      {
        path: '/register',
        element: (
          <RestrictedRoute component={Register} redirectTo="/phonebook" />
        ),
      },
      {
        path: '/phonebook',
        element: <PrivateRoute component={Phonebook} redirectTo="/" />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
