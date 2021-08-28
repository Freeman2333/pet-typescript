import { Dispatch } from "redux";
import moment from "moment";

import {
  InvoiceActionTypes,
  CREATE_INVOICE_STARTED,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  InvoiceFormValues,
  INVOICE_CLEAN_ERROR,
  Invoice,
  CLEAN_INVOICES_LIST,
  GET_INVOICES_STARTED,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILED,
  CLEAN_INVOICE_INFO,
  GET_INVOICE_STARTED,
  GET_INVOICE_SUCCESS,
  GET_INVOICE_FAILED,
  UPDATE_INVOICE_STARTED,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED,
  DELETE_INVOICE_STARTED,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED
} from "./invoice.types";
import { api } from "../../config/api";
import { getError } from "../../utils/errorHandler";

const createInvoiceStarted = (): InvoiceActionTypes => ({
  type: CREATE_INVOICE_STARTED
});

const createInvoiceSuccess = (): InvoiceActionTypes => ({
  type: CREATE_INVOICE_SUCCESS
});

const createInvoiceFailed = (errorMessage: string): InvoiceActionTypes => ({
  type: CREATE_INVOICE_FAILED,
  payload: errorMessage
});

export const createInvoice = (values: InvoiceFormValues) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(createInvoiceStarted());

    await api.post("/invoices", {
      ...values,
      date: moment(values.date!).format(),
      dueDate: moment(values.dueDate!).format()
    });

    dispatch(createInvoiceSuccess());
  } catch (error) {
    const message = getError(error);

    dispatch(createInvoiceFailed(message));

    throw new Error(message);
  }
};

export const invoiceCleanError = () => ({
  type: INVOICE_CLEAN_ERROR
});

const getInvoicesStarted = (): InvoiceActionTypes => ({
  type: GET_INVOICES_STARTED
});

const getInvoicesSuccess = (invoices: Invoice[]): InvoiceActionTypes => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices
});

const getInvoicesFailed = (errorMessage: string): InvoiceActionTypes => ({
  type: GET_INVOICES_FAILED,
  payload: errorMessage
});

export const getInvoices = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getInvoicesStarted());

    const { data } = await api.get<Invoice[]>("/invoices");

    dispatch(getInvoicesSuccess(data));
  } catch (error) {
    const message = getError(error);

    dispatch(getInvoicesFailed(message));
  }
};

export const cleanInvoicesList = () => ({
  type: CLEAN_INVOICES_LIST
});

const getInvoiceStarted = (): InvoiceActionTypes => ({
  type: GET_INVOICE_STARTED
});

const getInvoiceSuccess = (invoice: Invoice): InvoiceActionTypes => ({
  type: GET_INVOICE_SUCCESS,
  payload: invoice
});

const getInvoiceFailed = (errorMessage: string): InvoiceActionTypes => ({
  type: GET_INVOICE_FAILED,
  payload: errorMessage
});

export const getInvoice = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(getInvoiceStarted());

    const { data } = await api.get<Invoice>(`/invoices/${id}`);

    const invoice: Invoice = {
      ...data,
      date: moment(data.date),
      dueDate: moment(data.dueDate)
    };

    dispatch(getInvoiceSuccess(invoice));
  } catch (error) {
    const message = getError(error);

    dispatch(getInvoiceFailed(message));
  }
};

export const cleanInvoiceInfo = () => ({
  type: CLEAN_INVOICE_INFO
});

const updateInvoiceStarted = (): InvoiceActionTypes => ({
  type: UPDATE_INVOICE_STARTED
});

const updateInvoiceSuccess = (invoice: Invoice): InvoiceActionTypes => ({
  type: UPDATE_INVOICE_SUCCESS,
  payload: invoice
});

const updateInvoiceFailed = (errorMessage: string): InvoiceActionTypes => ({
  type: UPDATE_INVOICE_FAILED,
  payload: errorMessage
});

export const updateInvoice = (values: InvoiceFormValues, id: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(updateInvoiceStarted());

    const { data } = await api.put<Invoice>(`/invoices/${id}`, {
      ...values,
      date: moment(values.date!).format(),
      dueDate: moment(values.dueDate!).format()
    });

    const invoice: Invoice = {
      ...data,
      date: moment(data.date),
      dueDate: moment(data.dueDate)
    };

    dispatch(updateInvoiceSuccess(invoice));
  } catch (error) {
    const message = getError(error);

    dispatch(updateInvoiceFailed(message));

    throw new Error(message);
  }
};

const deleteInvoiceStarted = (): InvoiceActionTypes => ({
  type: DELETE_INVOICE_STARTED
});

const deleteInvoiceSuccess = (invoices: Invoice[]): InvoiceActionTypes => ({
  type: DELETE_INVOICE_SUCCESS,
  payload: invoices
});

const deleteInvoiceFailed = (errorMessage: string): InvoiceActionTypes => ({
  type: DELETE_INVOICE_FAILED,
  payload: errorMessage
});

export const deleteInvoice = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(deleteInvoiceStarted());

    await api.delete(`/invoices/${id}`);
    const { data } = await api.get<Invoice[]>("/invoices");

    dispatch(deleteInvoiceSuccess(data));
  } catch (error) {
    const message = getError(error);

    dispatch(deleteInvoiceFailed(message));

    throw new Error(message);
  }
};
