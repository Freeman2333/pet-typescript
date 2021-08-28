import React from "react";
import { Typography, Row, Col } from "antd";

import { InvoiceStatusTag } from "../invoice-status-tag/invoice-status-tag.component";
import { FormLabel } from "../form-label/form-label.component";
import { formatDateShort } from "../../utils/formatting";
import { Invoice } from "../../redux/invoice/invoice.types";

const { Text } = Typography;

interface InvoiceMetadataProps {
  invoice: Invoice;
}

export const InvoiceMetadata: React.FC<InvoiceMetadataProps> = ({
  invoice
}) => (
  <>
    <InvoiceStatusTag invoice={invoice} big />
    <Text style={{ fontSize: 20 }} strong>
      {invoice.title}
    </Text>
    <Row style={{ marginTop: 16 }}>
      <Col span={12}>
        <FormLabel>From</FormLabel>
        {invoice.from}
      </Col>
      <Col span={12}>
        <FormLabel>Date</FormLabel>
        {formatDateShort(invoice.date)}
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <FormLabel>To</FormLabel>
        {invoice.client.name}
      </Col>
      <Col span={12}>
        <FormLabel>Due date</FormLabel>
        {formatDateShort(invoice.dueDate)}
      </Col>
    </Row>
  </>
);
