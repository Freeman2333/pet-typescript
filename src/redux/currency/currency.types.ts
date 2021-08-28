export interface CurrencyState {
  list: Currency[] | null;
  isFetching: boolean;
  errorMessage: string | null;
}

export interface Currency {
  coin: string;
  value: number;
}

export const GET_CURRENCY_STARTED = "GET_CURRENCY_STARTED";
export const GET_CURRENCY_SUCCESS = "GET_CURRENCY_SUCCESS";
export const GET_CURRENCY_FAILED = "GET_CURRENCY_FAILED";
export const CURRENCY_CLEAN_ERROR = "CURRENCY_CLEAN_ERROR";

interface GetCurrencyStartedAction {
  type: typeof GET_CURRENCY_STARTED;
}

interface GetCurrencySuccessAction {
  type: typeof GET_CURRENCY_SUCCESS;
  payload: Currency[];
}

interface GetCurrencyFailedAction {
  type: typeof GET_CURRENCY_FAILED;
  payload: string;
}

interface CurrencyCleanErrorAction {
  type: typeof CURRENCY_CLEAN_ERROR;
}

export type CurrencyActionTypes =
  | GetCurrencyStartedAction
  | GetCurrencySuccessAction
  | GetCurrencyFailedAction
  | CurrencyCleanErrorAction;
