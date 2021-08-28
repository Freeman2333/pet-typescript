import React from "react";
import faker from "faker";
import { ColumnProps } from "antd/lib/table";
import { Tag, Typography } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import { InvoiceStatusTag } from "../invoice-status-tag/invoice-status-tag.component";
import {
  formatCurrency,
  formatPercent,
  formatDateShort
} from "../../utils/formatting";
import { Invoice } from "../../redux/invoice/invoice.types";

const { Text } = Typography;

export const invoicesTableColumns: ColumnProps<Invoice>[] = [
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
    render: (text, record) => (
      <>
        <Tag>{formatDateShort(record.date)}</Tag>
        <Text strong>
          <Link to={`/invoices/${record.id}`}>{record.title}</Link>
        </Text>
        <Typography style={{ marginTop: 8 }}>
          To: {record.client.name}
        </Typography>
      </>
    )
  },
  {
    title: "Due date",
    dataIndex: "due_date",
    key: "due_date",
    render: (text, record) => {
      return (
        <>
          <InvoiceStatusTag invoice={record} />
          Due: {formatDateShort(record.dueDate)}
        </>
      );
    }
  },
  {
    title: "Payment info",
    dataIndex: "payment_info",
    key: "payment_info",
    render: (text, record) => (
      <Typography style={{ textAlign: "end" }}>
        {formatCurrency(record.total)} USD
        <br />
        <Text type="secondary">
          Due {moment() > moment(record.dueDate) ? "for" : "in"}{" "}
          {moment(record.dueDate).fromNow(true)} (
          {formatPercent((100 * record.paid) / record.total)} paid)
        </Text>
      </Typography>
    )
  }
];
