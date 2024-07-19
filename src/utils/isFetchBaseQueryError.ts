import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => {
  return 'status' in error;
};
