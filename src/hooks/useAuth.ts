import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authApi } from '@redux/auth/authApi';
import { setRefreshAuth } from '@redux/auth/authSlice';
import type { AppDispatch } from '@redux/store';

export const useAuth = () => {
  const { data } = authApi.useRefreshQuery();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(setRefreshAuth(data));
  }, [dispatch, data]);
};
