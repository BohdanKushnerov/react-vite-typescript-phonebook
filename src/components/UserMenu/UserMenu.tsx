import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@redux/auth/authOperations';
import { getAuthName } from '@redux/auth/authSelectors';
import { UserMenuBtn } from './UserMenu.styled';
import { AppDispatch } from '@redux/store';

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
