import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import Layout from '@components/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Phonebook from '@pages/Phonebook';
import ErrorPage from '@pages/ErrorPage';
import { getIsRefreshingStatus } from '@redux/auth/selectors';

const AppRouter = () => {
  const isRefreshing = useSelector(getIsRefreshingStatus);

  return (
    <>
      {!isRefreshing && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={
                <RestrictedRoute component={Login} redirectTo="/phonebook" />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute component={Register} redirectTo="/phonebook" />
              }
            />
            <Route
              path="/phonebook"
              element={
                <PrivateRoute component={Phonebook} redirectTo="/login" />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
