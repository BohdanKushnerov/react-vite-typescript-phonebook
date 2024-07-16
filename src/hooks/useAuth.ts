import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authApi } from '@redux/auth/authApi';
import { setRefreshAuth } from '@redux/auth/authSlice';
import type { AppDispatch } from '@redux/store';

export const useAuth = () => {
  const { data } = authApi.useRefreshQuery();

  const dispatch: AppDispatch = useDispatch();

  // console.log(data, error);
  // console.log('isLoading', isLoading);
  // console.log('isFetching', isFetching);
  // console.log('isSuccess', isSuccess);
  // console.log('isUninitialized', isUninitialized);

  useEffect(() => {
    if (!data) return;
    dispatch(setRefreshAuth(data));
  }, [dispatch, data]);
};
