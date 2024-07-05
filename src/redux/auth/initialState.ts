import { IAuthInitialState } from '@interfaces/redux/auth/IAuthInitialState';

export const initialState: IAuthInitialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};
