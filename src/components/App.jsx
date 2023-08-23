import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '@redux/auth/authOperations';
import { getisRefreshingStatus } from '@redux/auth/authSelectors';
import { Layout } from './Layout';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import Phonebook from '@pages/Phonebook';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import ErrorPage from '@pages/ErrorPage';

export function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(getisRefreshingStatus);

  useEffect(() => {
    const promise = dispatch(refreshUser());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    !isRefreshing && (
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
            element={<PrivateRoute component={Phonebook} redirectTo="/login" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    )
  );
}
