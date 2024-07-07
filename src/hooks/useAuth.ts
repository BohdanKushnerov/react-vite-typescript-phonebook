import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@redux/store';
import { refreshUser } from '@redux/auth/operations';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(refreshUser());

    return () => {
      promise.abort();
    };
  }, [dispatch]);
};
