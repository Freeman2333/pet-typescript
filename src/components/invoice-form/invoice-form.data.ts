import * as yup from "yup";

import { InvoiceItem } from "../../redux/invoice/invoice.types";

export const invoiceFormValidationSchema = yup.object().shape({
  title: yup.string().required("Required!"),
  from: yup.string().required("Required!"),
  paid: yup
    .number()
    .typeError("Required!")
    .min(0, "Must be greater than zero!")
    .required("Required!"),
  items: yup.array().of(
    yup.object().shape<InvoiceItem>({
      description: yup.string().required("Required!"),
      _id: yup.string(),
      rate: yup
        .number()
        .typeError("Required!")
        .positive("Must be greater than zero!")
        .required("Required!"),
      quantity: yup
        .number()
        .typeError("Required!")
        .positive("Must be greater than zero!")
        .required("Required!")
    })
  ),
  client: yup.string().required("Required!")
});
