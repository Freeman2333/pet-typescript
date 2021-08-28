import { createSelector } from "reselect";

import { RootState } from "..";

const selectInvoice = (state: RootState) => state.invoice;

export const selectInvoiceErrorMessage = createSelector(
  selectInvoice,
  invoice => invoice.errorMessage
);

export const selectInvoiceIsFetching = createSelector(
  selectInvoice,
  invoice => invoice.isFetching
);

export const selectInvoicesList = createSelector(
  selectInvoice,
  invoice => invoice.list || []
);

export const selectSingleInvoice = createSelector(
  selectInvoice,
  invoice => invoice.singleInvoice
);

export const selectInvoiceIsProcessing = createSelector(
  selectInvoice,
  invoice => invoice.isProcessing
);
