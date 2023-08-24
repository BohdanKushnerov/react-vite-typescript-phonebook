import { RootState } from '@redux/store';

// type AuthState = RootState['auth'];

// type AuthSelectors = {
//   getisLoggedInStatus: (state: RootState) => AuthState['isLoggedIn'];
//   getisRefreshingStatus: (state: RootState) => AuthState['isRefreshing'];
//   getAuthName: (state: RootState) => AuthState['user']['name'];
// };

// const authSelectors: AuthSelectors = {
//   getisLoggedInStatus: (state) => state.auth.isLoggedIn,
//   getisRefreshingStatus: (state) => state.auth.isRefreshing,
//   getAuthName: (state) => state.auth.user.name,
// };

export const getisLoggedInStatus = (state: RootState) => state.auth.isLoggedIn;
export const getisRefreshingStatus = (state: RootState) =>
  state.auth.isRefreshing;
export const getAuthName = (state: RootState) => state.auth.user.name;
