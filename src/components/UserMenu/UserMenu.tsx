import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@redux/store';
import { getAuthName } from '@redux/auth/selectors';
import { logOut } from '@redux/auth/operations';
import { UserMenuBtn } from './UserMenu.styled';

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
        onClick={() => dispatch(logOut())}
      >
        Logout
      </UserMenuBtn>
    </div>
  );
};

export default UserMenu;
