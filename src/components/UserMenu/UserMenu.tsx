import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { UserMenuBtn } from './UserMenu.styled';

import { authApi } from '@redux/auth/authApi';
import { setLogout } from '@redux/auth/authSlice';
import { getAuthName } from '@redux/auth/selectors';
import type { AppDispatch } from '@redux/store';

const UserMenu = () => {
  const [logout] = authApi.useLogoutMutation();
  const dispatch: AppDispatch = useDispatch();

  const name = useSelector(getAuthName);

  const handleClickLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      toast.info('See you soon =)');
    } catch (error) {
      console.log('logout', error);
    }
  };

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
      <UserMenuBtn type="button" size="small" onClick={handleClickLogout}>
        Logout
      </UserMenuBtn>
    </div>
  );
};

export default UserMenu;
