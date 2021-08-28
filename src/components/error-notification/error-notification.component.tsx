import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

import { selectUserError } from "../../redux/user/user.selectors";
import { userCleanError } from "../../redux/user/user.actions";
import { selectInvoiceErrorMessage } from "../../redux/invoice/invoice.selectors";
import { invoiceCleanError } from "../../redux/invoice/invoice.actions";
import { selectCurrencyError } from "../../redux/currency/currency.selectors";
import { currencyCleanError } from "../../redux/currency/currency.actions";
import { selectClientError } from "../../redux/client/client.selectors";
import { clientCleanError } from "../../redux/client/client.actions";

export const ErrorNotification = () => {
  const userErrorMessage = useSelector(selectUserError);
  const invoiceErrorMessage = useSelector(selectInvoiceErrorMessage);
  const currencyExchangeMessage = useSelector(selectCurrencyError);
  const clientErrorMessage = useSelector(selectClientError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userErrorMessage) {
      message.error(userErrorMessage);
      dispatch(userCleanError());
    }

    if (invoiceErrorMessage) {
      message.error(invoiceErrorMessage);
      dispatch(invoiceCleanError());
    }

    if (currencyExchangeMessage) {
      message.error(currencyExchangeMessage);
      dispatch(currencyCleanError());
    }

    if (clientErrorMessage) {
      message.error(clientErrorMessage);
      dispatch(clientCleanError());
    }
  }, [userErrorMessage, invoiceErrorMessage, currencyExchangeMessage]);

  return null;
};
