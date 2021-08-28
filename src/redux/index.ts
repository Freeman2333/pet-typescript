import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { userReducer } from "./user/user.reducer";
import { invoiceReducer } from "./invoice/invoice.reducer";
import { currencyReducer } from "./currency/currency.reducer";
import { clientReducer } from "./client/client.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  invoice: invoiceReducer,
  currency: currencyReducer,
  client: clientReducer
});

const middlewares = [thunk, createLogger({ collapsed: true })];

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
