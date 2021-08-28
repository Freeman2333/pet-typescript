import { Dispatch } from "redux";
import { AxiosError } from "axios";

import {
  UserActionTypes,
  User,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LoginResponse,
  USER_CLEAN_ERROR,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GetUserResponse
} from "./user.types";
import { api } from "../../config/api";
import { LoginFormValues } from "../../components/login-form/login-form.component";
import { StrapiErrorResponse } from "../../interfaces/strapi";

const loginStarted = (): UserActionTypes => ({
  type: LOGIN_STARTED
});

const loginSuccess = (user: User): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: user
});

const loginFailed = (errorMessage: string): UserActionTypes => ({
  type: LOGIN_FAILED,
  payload: errorMessage
});

export const userCleanError = (): UserActionTypes => ({
  type: USER_CLEAN_ERROR
});

const getUserStarted = (): UserActionTypes => ({
  type: GET_USER_STARTED
});

const getUserSuccess = (user: User): UserActionTypes => ({
  type: GET_USER_SUCCESS,
  payload: user
});

const getUserFailed = (errorMessage: string): UserActionTypes => ({
  type: GET_USER_FAILED,
  payload: errorMessage
});

export const login = (values: LoginFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(loginStarted());

    const { data } = await api.post<LoginResponse>("/auth/local", values);

    localStorage.setItem("jwt", data.jwt);

    dispatch(loginSuccess(data.user));
  } catch (error) {
    const err: AxiosError<StrapiErrorResponse> = error;
    const message =
      err.response?.data.message[0].messages[0].message || err.message;

    dispatch(loginFailed(message));

    throw new Error(message);
  }
};

export const getUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getUserStarted());

    const { data } = await api.get<GetUserResponse>("/users/me");

    dispatch(getUserSuccess(data));
  } catch (err) {
    dispatch(getUserFailed("Failed to get user info"));
  }
};
