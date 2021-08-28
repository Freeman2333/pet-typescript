import {
  CurrencyState,
  CurrencyActionTypes,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_FAILED,
  GET_CURRENCY_STARTED,
  CURRENCY_CLEAN_ERROR
} from "./currency.types";

const initialState: CurrencyState = {
  list: null,
  isFetching: false,
  errorMessage: null
};

export const currencyReducer = (
  state = initialState,
  action: CurrencyActionTypes
): CurrencyState => {
  switch (action.type) {
    case GET_CURRENCY_STARTED:
      return {
        ...state,
        isFetching: true
      };
    case GET_CURRENCY_SUCCESS:
      return {
        ...state,
        list: action.payload,
        errorMessage: null,
        isFetching: false
      };
    case GET_CURRENCY_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false
      };
    case CURRENCY_CLEAN_ERROR:
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
};
