import React from "react";
import { ColumnProps } from "antd/lib/table";
import { Input, InputNumber, Button } from "antd";

const { TextArea } = Input;

export const invoiceTableColumns: ColumnProps<{}>[] = [
  {
    title: "Description",
    key: "description",
    width: "50%",
    render: (text, record) => {
      return <TextArea placeholder="Item name or description" />;
    }
  },
  {
    title: "Quantity",
    key: "quantity",
    align: "right",
    render: (text, record) => {
      return <InputNumber placeholder="Quantity" />;
    }
  },
  {
    title: "Rate",
    key: "rate",
    align: "right",
    render: (text, record) => {
      return <InputNumber placeholder="Unit price" />;
    }
  },
  {
    title: "Amount",
    key: "amount",
    align: "right",
    render: (text, record) => {
      return <InputNumber placeholder="Total" disabled />;
    }
  },
  {
    title: "",
    key: "actions",
    align: "right",
    width: "32px",
    render: (text, record) => {
      return <Button type="danger" icon="delete" />;
    }
  }
];
