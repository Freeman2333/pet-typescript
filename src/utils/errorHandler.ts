import { AxiosError } from "axios";
import { get } from "lodash";

import { StrapiErrorResponse } from "../interfaces/strapi";

export const getError = (error: AxiosError<StrapiErrorResponse>) => {
  const message = get(
    error,
    "response.data.message[0].messages[0].message",
    get(error, "response.data.message", "Something went wrong")
  );

  console.log(error.response?.data);

  return message;
};
