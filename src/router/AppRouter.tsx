import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

import Layout from '../Layout';

import ErrorPage from '@pages/ErrorPage';

import { AppPaths } from '@enums/appPaths';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Phonebook = lazy(() => import('@pages/Phonebook'));

const router = createBrowserRouter([
  {
    path: AppPaths.BasePath,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: AppPaths.BasePath,
        element: <Home />,
      },
      {
        path: AppPaths.LoginPath,
        // element: <Login />,
        element: (
          <RestrictedRoute
            component={Login}
            redirectTo={AppPaths.PhonebookPath}
          />
        ),
      },
      {
        path: AppPaths.RegisterPath,
        // element: <Register />,
        element: (
          <RestrictedRoute
            component={Register}
            redirectTo={AppPaths.PhonebookPath}
          />
        ),
      },
      {
        path: AppPaths.PhonebookPath,
        // element: <Phonebook />,
        element: (
          <PrivateRoute component={Phonebook} redirectTo={AppPaths.LoginPath} />
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
