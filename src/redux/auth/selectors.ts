import { RootState } from '@redux/store';

export const getIsLoggedInStatus = (state: RootState) => state.auth.isLoggedIn;
export const getIsRefreshingStatus = (state: RootState) =>
  state.auth.isRefreshing;
export const getAuthName = (state: RootState) => state.auth.user.name;
export const getAuthError = (state: RootState) => state.auth.error;
