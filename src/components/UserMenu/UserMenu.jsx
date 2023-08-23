import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@redux/auth/authOperations';
import { getAuthName } from '@redux/auth/authSelectors';
import { UserMenuBtn } from './UserMenu.styled';

const UserMenu = () => {
  const dispatch = useDispatch();

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
