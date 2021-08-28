import {
  UserState,
  UserActionTypes,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_CLEAN_ERROR,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from "./user.types";

const initialState: UserState = {
  user: null,
  isFetching: false,
  errorMessage: null
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case USER_CLEAN_ERROR:
      return {
        ...state,
        errorMessage: null
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errorMessage: null
      };
    case GET_USER_FAILED:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
