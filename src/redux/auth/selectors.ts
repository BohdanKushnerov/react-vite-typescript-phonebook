import type { RootState } from '@redux/store';

export const getToken = (state: RootState) => state.auth.token;
export const getAuthName = (state: RootState) => state.auth.user.name;
// export const getIsRefreshingStatus = (state: RootState) =>
//   state.auth.isRefreshing;
// export const getAuthError = (state: RootState) => state.auth.error;
