import { Dispatch } from "redux";

import {
  CurrencyActionTypes,
  CURRENCY_CLEAN_ERROR,
  GET_CURRENCY_STARTED,
  GET_CURRENCY_SUCCESS,
  Currency,
  GET_CURRENCY_FAILED
} from "./currency.types";
import { api } from "../../config/api";
import { getError } from "../../utils/errorHandler";

export const currencyCleanError = (): CurrencyActionTypes => ({
  type: CURRENCY_CLEAN_ERROR
});

const getCurrencyStarted = (): CurrencyActionTypes => ({
  type: GET_CURRENCY_STARTED
});

const getCurrencySuccess = (list: Currency[]): CurrencyActionTypes => ({
  type: GET_CURRENCY_SUCCESS,
  payload: list
});

const getCurrencyFailed = (errorMessage: string): CurrencyActionTypes => ({
  type: GET_CURRENCY_FAILED,
  payload: errorMessage
});

export const getCurrency = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getCurrencyStarted());

    const { data } = await api.get<Currency[]>("/currency-exchanges");

    dispatch(getCurrencySuccess(data));
  } catch (error) {
    const message = getError(error);

    dispatch(getCurrencyFailed(message));
  }
};
