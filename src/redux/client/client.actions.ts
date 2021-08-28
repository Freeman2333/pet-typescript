import { Dispatch } from "redux";

import { api } from "../../config/api";
import { getError } from "../../utils/errorHandler";
import {
  ClientActionTypes,
  CLIENT_CLEAN_ERROR,
  GET_CLIENT_STARTED,
  Client,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED
} from "./client.types";

export const clientCleanError = (): ClientActionTypes => ({
  type: CLIENT_CLEAN_ERROR
});

const getClientStarted = (): ClientActionTypes => ({
  type: GET_CLIENT_STARTED
});

const getClientSuccess = (list: Client[]): ClientActionTypes => ({
  type: GET_CLIENT_SUCCESS,
  payload: list
});

const getClientFailed = (errorMessage: string): ClientActionTypes => ({
  type: GET_CLIENT_FAILED,
  payload: errorMessage
});

export const getClient = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getClientStarted());

    const { data } = await api.get<Client[]>("/clients");

    dispatch(getClientSuccess(data));
  } catch (error) {
    const message = getError(error);

    dispatch(getClientFailed(message));
  }
};
