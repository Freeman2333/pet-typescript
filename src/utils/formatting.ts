import numeral from "numeral";
import moment, { Moment } from "moment";

export const formatCurrency = (value: number): string =>
  numeral(value).format("0,0.00");

export const formatPercent = (value: number): string =>
  `${numeral(value).format("0,0")}%`;

export const formatDateShort = (value: string | Date | Moment): string =>
  moment(value).format("ll");
