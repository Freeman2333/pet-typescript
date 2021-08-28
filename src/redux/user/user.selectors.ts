import { createSelector } from "reselect";

import { RootState } from "..";

const selectUser = (state: RootState) => state.user;

export const selectUserFetching = createSelector(
  selectUser,
  user => user.isFetching
);

export const selectUserError = createSelector(
  selectUser,
  user => user.errorMessage
);

export const selectUserInfo = createSelector(selectUser, user => user.user);
