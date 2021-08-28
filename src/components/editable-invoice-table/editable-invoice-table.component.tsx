import React, { useCallback } from "react";
import { Table, Button, InputNumber, Typography } from "antd";
import { get } from "lodash";

import {
  InvoiceFormFields,
  InvoiceFormItemFields
} from "../invoice-form/invoice-form.component";
import { formatCurrency } from "../../utils/formatting";
import { TextAreaFormik } from "../formik-fields/textarea.component";
import { InputNumberFormik } from "../formik-fields/input-number.component";
import { FormikErrors, FormikTouched } from "formik";
import {
  Invoice,
  InvoiceItem,
  InvoiceFormValues
} from "../../redux/invoice/invoice.types";

const { Column } = Table;
const { Text } = Typography;

interface EditableInvoiceTableProps {
  handleChange?: (field: string, value: any) => void;
  addInvoiceItem?: () => void;
  removeInvoiceItem?: (index: number) => void;
  readonly?: boolean;
  invoice: Invoice | InvoiceFormValues;
  errors?: FormikErrors<InvoiceFormValues>;
  touched?: FormikTouched<InvoiceFormValues>;
}

export const EditableInvoiceTable: React.FC<EditableInvoiceTableProps> = ({
  addInvoiceItem,
  handleChange,
  removeInvoiceItem,
  readonly,
  invoice,
  errors,
  touched
}) => {
  const tableFooter = useCallback(() => {
    if (!readonly && addInvoiceItem) {
      return <Button onClick={addInvoiceItem}>New line</Button>;
    }

    const currentInvoice = invoice as Invoice;

    return (
      <>
        <Typography style={{ textAlign: "right" }}>
          <Text strong>Total:</Text> USD ${formatCurrency(currentInvoice.total)}
        </Typography>
        {currentInvoice.paid !== 0 && (
          <>
            <Typography style={{ textAlign: "right" }}>
              <Text strong>Paid to date:</Text> USD $
              {formatCurrency(currentInvoice.paid)}
            </Typography>
            <Typography style={{ textAlign: "right" }}>
              <Text strong>Left:</Text> USD $
              {formatCurrency(currentInvoice.total - currentInvoice.paid)}
            </Typography>
          </>
        )}
      </>
    );
  }, [addInvoiceItem]);

  const descriptionColumnRender = useCallback(
    (text: string, record: InvoiceItem, index: number) => {
      if (!readonly && handleChange) {
        const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleChange(
            `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.DESCRIPTION}]`,
            event.target.value
          );
        };

        return (
          <TextAreaFormik
            placeholder="Item name or description"
            value={record[InvoiceFormItemFields.DESCRIPTION]}
            onChange={onChange}
            name={`${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.DESCRIPTION}]`}
            error={get(
              errors,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.DESCRIPTION}]`,
              ""
            )}
            touched={get(
              touched,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.DESCRIPTION}]`,
              ""
            )}
          />
        );
      } else {
        return (
          <Typography style={{ whiteSpace: "pre" }}>
            {record.description}
          </Typography>
        );
      }
    },
    [errors![InvoiceFormFields.ITEMS], touched![InvoiceFormFields.ITEMS]]
  );

  const quantityColumnRender = useCallback(
    (text: string, record: InvoiceItem, index: number) => {
      if (!readonly && handleChange) {
        return (
          <InputNumberFormik
            placeholder="Quantity"
            value={record[InvoiceFormItemFields.QUANTITY]}
            onChange={handleChange}
            name={`${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.QUANTITY}]`}
            error={get(
              errors,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.QUANTITY}]`,
              ""
            )}
            touched={get(
              touched,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.QUANTITY}]`,
              ""
            )}
          />
        );
      } else {
        return <Typography>{record.quantity}</Typography>;
      }
    },
    [errors![InvoiceFormFields.ITEMS], touched![InvoiceFormFields.ITEMS]]
  );

  const rateColumnRender = useCallback(
    (text: string, record: InvoiceItem, index: number) => {
      if (!readonly && handleChange) {
        return (
          <InputNumberFormik
            placeholder="Unit price"
            value={record[InvoiceFormItemFields.RATE]}
            onChange={handleChange}
            name={`${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.RATE}]`}
            error={get(
              errors,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.RATE}]`,
              ""
            )}
            touched={get(
              touched,
              `${InvoiceFormFields.ITEMS}[${index}][${InvoiceFormItemFields.RATE}]`,
              ""
            )}
          />
        );
      } else {
        return <Typography>{record.rate}</Typography>;
      }
    },
    [errors![InvoiceFormFields.ITEMS], touched![InvoiceFormFields.ITEMS]]
  );

  const totalColumnRender = useCallback(
    (text: string, record: InvoiceItem, index: number) => {
      const quantity = get(record, "quantity", 0);
      const rate = get(record, "rate", 0);

      if (!readonly && handleChange) {
        return (
          <InputNumber
            placeholder="Unit price"
            value={quantity * rate}
            disabled
          />
        );
      }

      return <Typography>USD {formatCurrency(quantity * rate)}</Typography>;
    },
    []
  );

  const actionsColumnRender = useCallback(
    (text: string, record: InvoiceItem, index: number) => {
      const onClick = () => {
        removeInvoiceItem!(index);
      };

      return <Button type="danger" icon="delete" onClick={onClick} />;
    },
    [removeInvoiceItem]
  );

  const tableRowKey = useCallback((record: InvoiceItem) => {
    return `editable-invoice-table-${record._id}`;
  }, []);

  return (
    <Table
      dataSource={invoice.items}
      pagination={false}
      footer={tableFooter}
      rowKey={tableRowKey}
      style={{ marginTop: 16 }}
    >
      <Column
        title="Description"
        key="description"
        width="50%"
        render={descriptionColumnRender}
      />
      <Column
        title="Quantity"
        key="quantity"
        align="right"
        render={quantityColumnRender}
      />
      <Column title="Rate" key="rate" align="right" render={rateColumnRender} />
      <Column
        title="Amount"
        key="amout"
        align="right"
        render={totalColumnRender}
      />
      {!readonly ? (
        <Column key="actions" align="right" render={actionsColumnRender} />
      ) : null}
    </Table>
  );
};

EditableInvoiceTable.defaultProps = {
  readonly: false,
  errors: {},
  touched: {}
};
