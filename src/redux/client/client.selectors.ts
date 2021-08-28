import { createSelector } from "reselect";

import { RootState } from "..";

const selectClient = (state: RootState) => state.client;

export const selectClientFetching = createSelector(
  selectClient,
  client => client.isFetching
);

export const selectClientError = createSelector(
  selectClient,
  client => client.errorMessage
);

export const selectClientList = createSelector(
  selectClient,
  client => client.list || []
);
