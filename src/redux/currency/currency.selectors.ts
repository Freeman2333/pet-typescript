import { createSelector } from "reselect";

import { RootState } from "..";

const selectCurrency = (state: RootState) => state.currency;

export const selectCurrencyFetching = createSelector(
  selectCurrency,
  currency => currency.isFetching
);

export const selectCurrencyError = createSelector(
  selectCurrency,
  currency => currency.errorMessage
);

export const selectCurrencyList = createSelector(
  selectCurrency,
  currency => currency.list || []
);
