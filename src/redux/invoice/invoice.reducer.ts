import {
  InvoiceState,
  InvoiceActionTypes,
  CREATE_INVOICE_STARTED,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  INVOICE_CLEAN_ERROR,
  GET_INVOICES_STARTED,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILED,
  CLEAN_INVOICES_LIST,
  GET_INVOICE_STARTED,
  GET_INVOICE_SUCCESS,
  GET_INVOICE_FAILED,
  CLEAN_INVOICE_INFO,
  UPDATE_INVOICE_STARTED,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED
} from "./invoice.types";

const initialState: InvoiceState = {
  isFetching: false,
  errorMessage: null,
  list: null,
  singleInvoice: null,
  isProcessing: false
};

export const invoiceReducer = (
  state = initialState,
  action: InvoiceActionTypes
): InvoiceState => {
  switch (action.type) {
    case CREATE_INVOICE_STARTED:
      return {
        ...state,
        isProcessing: true,
        errorMessage: null
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        isProcessing: false
      };
    case CREATE_INVOICE_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isProcessing: false
      };
    case INVOICE_CLEAN_ERROR:
      return {
        ...state,
        errorMessage: null
      };
    case GET_INVOICES_STARTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_INVOICES_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false
      };
    case CLEAN_INVOICES_LIST:
      return {
        ...state,
        list: null
      };
    case GET_INVOICE_STARTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        singleInvoice: action.payload
      };
    case GET_INVOICE_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false
      };
    case CLEAN_INVOICE_INFO:
      return {
        ...state,
        singleInvoice: null
      };
    case UPDATE_INVOICE_STARTED:
      return {
        ...state,
        isProcessing: true,
        errorMessage: null
      };
    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        singleInvoice: action.payload
      };
    case UPDATE_INVOICE_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        isProcessing: false
      };
    default:
      return state;
  }
};
