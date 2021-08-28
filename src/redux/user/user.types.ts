export interface User {
  id: string;
  confirmed: boolean;
  blocked: boolean;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  user: User | null;
  isFetching: boolean;
  errorMessage: string | null;
}

export interface LoginResponse {
  jwt: string;
  user: User;
}

export interface GetUserResponse extends User {}

export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const USER_CLEAN_ERROR = "USER_CLEAN_ERROR";
export const GET_USER_STARTED = "GET_USER_STARTED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

interface LoginStartedAction {
  type: typeof LOGIN_STARTED;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: string;
}

interface UserCleanErrorAction {
  type: typeof USER_CLEAN_ERROR;
}

interface GetUserStartedAction {
  type: typeof GET_USER_STARTED;
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: User;
}

interface GetUserFailedAction {
  type: typeof GET_USER_FAILED;
  payload: string;
}

export type UserActionTypes =
  | LoginStartedAction
  | LoginSuccessAction
  | LoginFailedAction
  | UserCleanErrorAction
  | GetUserStartedAction
  | GetUserSuccessAction
  | GetUserFailedAction;
