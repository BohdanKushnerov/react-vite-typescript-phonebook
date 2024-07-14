import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshUser } from '@redux/auth/operations';
import type { AppDispatch } from '@redux/store';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(refreshUser());

    return () => {
      promise.abort();
    };
  }, [dispatch]);
};
