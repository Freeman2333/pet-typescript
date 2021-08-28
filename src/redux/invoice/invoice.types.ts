import { Moment } from "moment";

import { Client } from "../client/client.types";

export interface InvoiceState {
  isFetching: boolean;
  errorMessage: string | null;
  list: Invoice[] | null;
  singleInvoice: Invoice | null;
  isProcessing: boolean;
}

export interface Invoice {
  id: string;
  date: Date | Moment;
  title: string;
  dueDate: Date | Moment;
  total: number;
  currency: string;
  paid: number;
  from: string;
  items: InvoiceItem[];
  client: Client;
}

export interface InvoiceItem {
  _id: string;
  description: string;
  quantity?: number;
  rate?: number;
}

export interface InvoiceFormValues {
  title: string;
  from: string;
  date: Moment | null;
  dueDate: Moment | null;
  paid: number;
  items: InvoiceItem[];
  client?: string;
}

export const CREATE_INVOICE_STARTED = "CREATE_INVOICE_STARTED";
export const CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS";
export const CREATE_INVOICE_FAILED = "CREATE_INVOICE_FAILED";
export const INVOICE_CLEAN_ERROR = "INVOICE_CLEAN_ERROR";
export const GET_INVOICES_STARTED = "GET_INVOICES_STARTED";
export const GET_INVOICES_SUCCESS = "GET_INVOICES_SUCCESS";
export const GET_INVOICES_FAILED = "GET_INVOICES_FAILED";
export const CLEAN_INVOICES_LIST = "CLEAN_INVOICES_LIST";
export const GET_INVOICE_STARTED = "GET_INVOICE_STARTED";
export const GET_INVOICE_SUCCESS = "GET_INVOICE_SUCCESS";
export const GET_INVOICE_FAILED = "GET_INVOICE_FAILED";
export const CLEAN_INVOICE_INFO = "CLEAN_INVOICE_INFO";
export const UPDATE_INVOICE_STARTED = "UPDATE_INVOICE_STARTED";
export const UPDATE_INVOICE_SUCCESS = "UPDATE_INVOICE_SUCCESS";
export const UPDATE_INVOICE_FAILED = "UPDATE_INVOICE_FAILED";
export const DELETE_INVOICE_STARTED = "DELETE_INVOICE_STARTED";
export const DELETE_INVOICE_SUCCESS = "DELETE_INVOICE_SUCCESS";
export const DELETE_INVOICE_FAILED = "DELETE_INVOICE_FAILED";

interface CreateInvoiceStartedAction {
  type: typeof CREATE_INVOICE_STARTED;
}

interface CreateInvoiceSuccessAction {
  type: typeof CREATE_INVOICE_SUCCESS;
}

interface CreateInvoiceFailedAction {
  type: typeof CREATE_INVOICE_FAILED;
  payload: string;
}

interface InvoiceCleanErrorAction {
  type: typeof INVOICE_CLEAN_ERROR;
}

interface GetInvoicesStartedAction {
  type: typeof GET_INVOICES_STARTED;
}

interface GetInvoicesSuccessAction {
  type: typeof GET_INVOICES_SUCCESS;
  payload: Invoice[];
}

interface GetInvoicesFailedAction {
  type: typeof GET_INVOICES_FAILED;
  payload: string;
}

interface CleanInvoicesListAction {
  type: typeof CLEAN_INVOICES_LIST;
}

interface GetInvoiceStartedAction {
  type: typeof GET_INVOICE_STARTED;
}

interface GetInvoiceSuccessAction {
  type: typeof GET_INVOICE_SUCCESS;
  payload: Invoice;
}

interface GetInvoiceFailedAction {
  type: typeof GET_INVOICE_FAILED;
  payload: string;
}

interface CleanInvoiceInfoAction {
  type: typeof CLEAN_INVOICE_INFO;
}

interface UpdateInvoiceStartedAction {
  type: typeof UPDATE_INVOICE_STARTED;
}

interface UpdateInvoiceSuccessAction {
  type: typeof UPDATE_INVOICE_SUCCESS;
  payload: Invoice;
}

interface UpdateInvoiceFailedAction {
  type: typeof UPDATE_INVOICE_FAILED;
  payload: string;
}

interface DeleteInvoiceStartedAction {
  type: typeof DELETE_INVOICE_STARTED;
}

interface DeleteInvoiceSuccessAction {
  type: typeof DELETE_INVOICE_SUCCESS;
  payload: Invoice[];
}

interface DeleteInvoiceFailedAction {
  type: typeof DELETE_INVOICE_FAILED;
  payload: string;
}

export type InvoiceActionTypes =
  | CreateInvoiceStartedAction
  | CreateInvoiceSuccessAction
  | CreateInvoiceFailedAction
  | InvoiceCleanErrorAction
  | GetInvoicesStartedAction
  | GetInvoicesSuccessAction
  | GetInvoicesFailedAction
  | CleanInvoicesListAction
  | GetInvoiceStartedAction
  | GetInvoiceSuccessAction
  | GetInvoiceFailedAction
  | CleanInvoiceInfoAction
  | UpdateInvoiceStartedAction
  | UpdateInvoiceSuccessAction
  | UpdateInvoiceFailedAction
  | DeleteInvoiceStartedAction
  | DeleteInvoiceSuccessAction
  | DeleteInvoiceFailedAction;
