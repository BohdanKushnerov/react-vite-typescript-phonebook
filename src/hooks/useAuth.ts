import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authApi } from '@redux/auth/authApi';
import { setRefreshAuth, setResetAuth } from '@redux/auth/authSlice';
import type { AppDispatch } from '@redux/store';

import { isFetchBaseQueryError } from '@utils/isFetchBaseQueryError';

export const useAuth = () => {
  const { data, error } = authApi.useRefreshQuery();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setRefreshAuth(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error && isFetchBaseQueryError(error) && error.status === 401) {
      dispatch(setResetAuth());
    }
  }, [dispatch, error]);
};
