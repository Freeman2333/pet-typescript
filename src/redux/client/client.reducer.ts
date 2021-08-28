import {
  ClientState,
  ClientActionTypes,
  GET_CLIENT_STARTED,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  CLIENT_CLEAN_ERROR
} from "./client.types";

const initialState: ClientState = {
  list: null,
  isFetching: false,
  errorMessage: null
};

export const clientReducer = (
  state = initialState,
  action: ClientActionTypes
): ClientState => {
  switch (action.type) {
    case GET_CLIENT_STARTED:
      return {
        ...state,
        isFetching: true
      };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        list: action.payload,
        errorMessage: null,
        isFetching: false
      };
    case GET_CLIENT_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false
      };
    case CLIENT_CLEAN_ERROR:
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
};
