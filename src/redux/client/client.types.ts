export interface ClientState {
  list: Client[] | null;
  isFetching: boolean;
  errorMessage: string | null;
}

export interface Client {
  id: string;
  name: string;
}

export const GET_CLIENT_STARTED = "GET_CLIENT_STARTED";
export const GET_CLIENT_SUCCESS = "GET_CLIENT_SUCCESS";
export const GET_CLIENT_FAILED = "GET_CLIENT_FAILED";
export const CLIENT_CLEAN_ERROR = "CLIENT_CLEAN_ERROR";

interface GetClientStartedAction {
  type: typeof GET_CLIENT_STARTED;
}

interface GetClientSuccessAction {
  type: typeof GET_CLIENT_SUCCESS;
  payload: Client[];
}

interface GetClientFailedAction {
  type: typeof GET_CLIENT_FAILED;
  payload: string;
}

interface ClientCleanErrorAction {
  type: typeof CLIENT_CLEAN_ERROR;
}

export type ClientActionTypes =
  | GetClientStartedAction
  | GetClientSuccessAction
  | GetClientFailedAction
  | ClientCleanErrorAction;
