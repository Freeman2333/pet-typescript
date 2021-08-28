import axios, { AxiosError } from "axios";
import { get } from "lodash";

import { StrapiErrorResponse } from "../interfaces/strapi";
import { NO_AUTH_HEADER } from "../utils/constants";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("jwt");

    const { headers } = config;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return {
      ...config,
      headers
    };
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError<StrapiErrorResponse>) => {
    if (
      error.response?.data.statusCode === 401 ||
      get(error, "response.data.message[0].messages[0].id", "") ===
        NO_AUTH_HEADER
    ) {
      localStorage.removeItem("jwt");
      window.location.pathname = "/";
      return;
    }

    return Promise.reject(error);
  }
);
