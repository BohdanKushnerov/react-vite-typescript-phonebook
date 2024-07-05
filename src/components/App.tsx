import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import Phonebook from '@pages/Phonebook';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Home from '@pages/Home';
import ErrorPage from '@pages/ErrorPage';
import { refreshUser } from '@redux/auth/operations';
import { getIsRefreshingStatus } from '@redux/auth/selectors';
import { AppDispatch } from '@redux/store';

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isRefreshing = useSelector(getIsRefreshingStatus);

  useEffect(() => {
    const promise = dispatch(refreshUser());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

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

export default App;
