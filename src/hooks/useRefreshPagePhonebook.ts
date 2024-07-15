import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppPaths } from '@enums/appPaths';
import { LocalStorageValues } from '@enums/localStorageValues';

export const useRefreshPagePhonebook = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(LocalStorageValues.IsPhonebookPath)) {
      navigate(AppPaths.PhonebookPath);
    }
  }, [navigate]);
};
