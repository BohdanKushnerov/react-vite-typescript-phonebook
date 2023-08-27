import { RootState } from '@redux/store';

export const getisLoggedInStatus = (state: RootState) => state.auth.isLoggedIn;
export const getisRefreshingStatus = (state: RootState) =>
  state.auth.isRefreshing;
export const getAuthName = (state: RootState) => state.auth.user.name;
