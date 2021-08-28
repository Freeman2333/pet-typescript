import React, { useCallback, useMemo, useEffect } from "react";
import { Row, Col, Button, Select } from "antd";
import moment from "moment";
import { useFormik } from "formik";
import { v1 as uuid } from "uuid";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { EditableInvoiceTable } from "../../components/editable-invoice-table/editable-invoice-table.component";
import { DatePickerFormik } from "../formik-fields/date-picker.component";
import { FormLabel } from "../form-label/form-label.component";
import { InputFormik } from "../formik-fields/input.component";
import { invoiceFormValidationSchema } from "./invoice-form.data";
import { InputNumberFormik } from "../formik-fields/input-number.component";
import { Invoice, InvoiceFormValues } from "../../redux/invoice/invoice.types";
import {
  createInvoice,
  updateInvoice
} from "../../redux/invoice/invoice.actions";
import { Client } from "../../redux/client/client.types";
import {
  selectClientList,
  selectClientFetching
} from "../../redux/client/client.selectors";
import { SelectFormik } from "../formik-fields/select.component";

const { Option } = Select;

export enum InvoiceFormFields {
  TITLE = "title",
  FROM = "from",
  DATE = "date",
  DUE_DATE = "dueDate",
  ITEMS = "items",
  PAID = "paid",
  CLIENT = "client"
}

export enum InvoiceFormItemFields {
  DESCRIPTION = "description",
  QUANTITY = "quantity",
  RATE = "rate"
}

interface InvoiceFormProps {
  initialValues?: Invoice;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ initialValues }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const formik = useFormik<InvoiceFormValues>({
    initialValues: {
      title: "",
      from: "",
      date: moment(),
      dueDate: null,
      paid: 0,
      items: [
        {
          _id: uuid(),
          description: "",
          quantity: 0,
          rate: 0
        }
      ]
    },
    onSubmit: async values => {
      if (!values.date || !moment(values.date).isValid()) {
        formik.setFieldError(InvoiceFormFields.DATE, "Required!");
        return;
      }

      if (!values.dueDate || !moment(values.dueDate).isValid()) {
        formik.setFieldError(InvoiceFormFields.DUE_DATE, "Required!");
        return;
      }

      try {
        if (initialValues) {
          await dispatch(updateInvoice(values, initialValues.id));

          history.push(`/invoices/${initialValues.id}`);
        } else {
          await dispatch(createInvoice(values));

          history.push("/invoices");
        }
      } catch (err) {
        formik.setSubmitting(false);
      }
    },
    validationSchema: invoiceFormValidationSchema
  });

  useEffect(() => {
    map(initialValues, (value, key) => {
      if (["due_date", "created_at"].includes(key)) {
        formik.setFieldValue(key, moment(value as Date));
      } else if (key === "client") {
        formik.setFieldValue(key, (value as Client).id);
      } else {
        formik.setFieldValue(key, value);
      }
    });
  }, []);

  const addInvoiceItem = useCallback(() => {
    const newItems = [
      ...formik.values[InvoiceFormFields.ITEMS],
      { _id: uuid() }
    ];

    formik.setFieldValue(InvoiceFormFields.ITEMS, newItems);
  }, [formik.values[InvoiceFormFields.ITEMS]]);

  const removeInvoiceItem = useCallback(
    (index: number) => {
      const newItems = [...formik.values[InvoiceFormFields.ITEMS]];
      newItems.splice(index, 1);

      formik.setFieldValue(InvoiceFormFields.ITEMS, newItems);
    },
    [formik.values[InvoiceFormFields.ITEMS]]
  );

  const clients = useSelector(selectClientList);
  const isClientsFetching = useSelector(selectClientFetching);

  return (
    <form onSubmit={formik.handleSubmit}>
      {useMemo(
        () => (
          <Row>
            <Col span={12}>
              <FormLabel>Invoice title:</FormLabel>
              <InputFormik
                placeholder="Invoice title"
                name={InvoiceFormFields.TITLE}
                onChange={formik.handleChange}
                value={formik.values[InvoiceFormFields.TITLE]}
                error={formik.errors[InvoiceFormFields.TITLE]}
                touched={formik.touched[InvoiceFormFields.TITLE]}
              />
            </Col>
          </Row>
        ),
        [
          formik.values[InvoiceFormFields.TITLE],
          formik.errors[InvoiceFormFields.TITLE],
          formik.touched[InvoiceFormFields.TITLE]
        ]
      )}
      <Row style={{ marginTop: 16 }}>
        <Col span={12}>
          <FormLabel>From:</FormLabel>
          {useMemo(
            () => (
              <InputFormik
                placeholder="From"
                name={InvoiceFormFields.FROM}
                onChange={formik.handleChange}
                value={formik.values[InvoiceFormFields.FROM]}
                error={formik.errors[InvoiceFormFields.FROM]}
                touched={formik.touched[InvoiceFormFields.FROM]}
              />
            ),
            [
              formik.values[InvoiceFormFields.FROM],
              formik.errors[InvoiceFormFields.FROM],
              formik.touched[InvoiceFormFields.FROM]
            ]
          )}
          <FormLabel>To:</FormLabel>
          <SelectFormik
            handleChange={formik.setFieldValue}
            name={InvoiceFormFields.CLIENT}
            value={formik.values[InvoiceFormFields.CLIENT]}
            error={formik.errors[InvoiceFormFields.CLIENT]}
            touched={formik.touched[InvoiceFormFields.CLIENT]}
            loading={isClientsFetching}
            data={clients}
            optValue="id"
            optLabel="name"
          />
          <FormLabel>Paid:</FormLabel>
          {useMemo(
            () => (
              <InputNumberFormik
                placeholder="Paid"
                name={InvoiceFormFields.PAID}
                onChange={formik.setFieldValue}
                value={formik.values[InvoiceFormFields.PAID]}
                error={formik.errors[InvoiceFormFields.PAID]}
                touched={formik.touched[InvoiceFormFields.PAID]}
                fullWidth
              />
            ),
            [
              formik.values[InvoiceFormFields.PAID],
              formik.errors[InvoiceFormFields.PAID],
              formik.touched[InvoiceFormFields.PAID]
            ]
          )}
        </Col>
        <Col span={8} offset={4}>
          <FormLabel>Date:</FormLabel>
          {useMemo(
            () => (
              <DatePickerFormik
                format="YYYY/MM/DD"
                name={InvoiceFormFields.DATE}
                handleChange={formik.setFieldValue}
                value={formik.values[InvoiceFormFields.DATE]}
                error={formik.errors[InvoiceFormFields.DATE]}
                touched={formik.touched[InvoiceFormFields.DATE]}
              />
            ),
            [
              formik.values[InvoiceFormFields.DATE],
              formik.errors[InvoiceFormFields.DATE],
              formik.touched[InvoiceFormFields.DATE]
            ]
          )}
          <FormLabel>Invoice due:</FormLabel>
          {useMemo(
            () => (
              <DatePickerFormik
                format="YYYY/MM/DD"
                name={InvoiceFormFields.DUE_DATE}
                handleChange={formik.setFieldValue}
                value={formik.values[InvoiceFormFields.DUE_DATE]}
                error={formik.errors[InvoiceFormFields.DUE_DATE]}
                touched={formik.touched[InvoiceFormFields.DUE_DATE]}
              />
            ),
            [
              formik.values[InvoiceFormFields.DUE_DATE],
              formik.errors[InvoiceFormFields.DUE_DATE],
              formik.touched[InvoiceFormFields.DUE_DATE]
            ]
          )}
        </Col>
      </Row>

      {useMemo(
        () => (
          <EditableInvoiceTable
            invoice={formik.values}
            handleChange={formik.setFieldValue}
            addInvoiceItem={addInvoiceItem}
            removeInvoiceItem={removeInvoiceItem}
            errors={formik.errors}
            touched={formik.touched}
          />
        ),
        [
          formik.values[InvoiceFormFields.ITEMS],
          formik.errors[InvoiceFormFields.ITEMS],
          formik.touched[InvoiceFormFields.ITEMS],
          addInvoiceItem,
          removeInvoiceItem
        ]
      )}

      <Row justify="end" style={{ marginTop: 16 }} type="flex">
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            loading={formik.isSubmitting}
          >
            {initialValues ? "Edit invoice" : "Save invoice"}
          </Button>
        </Col>
      </Row>
    </form>
  );
};
