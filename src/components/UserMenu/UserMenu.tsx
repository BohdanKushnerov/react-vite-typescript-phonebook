import { useDispatch, useSelector } from 'react-redux';

import { UserMenuBtn } from './UserMenu.styled';

import { logOut } from '@redux/auth/operations';
import { getAuthName } from '@redux/auth/selectors';
import type { AppDispatch } from '@redux/store';

import { LocalStorageValues } from '@enums/localStorageValues';

const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();

  const name = useSelector(getAuthName);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ textAlign: 'center' }}>
        Welcome, <b>{name}</b>
      </p>
      <UserMenuBtn
        type="button"
        size="small"
        onClick={() => {
          localStorage.removeItem(LocalStorageValues.IsPhonebookPath);
          dispatch(logOut());
        }}
      >
        Logout
      </UserMenuBtn>
    </div>
  );
};

export default UserMenu;
