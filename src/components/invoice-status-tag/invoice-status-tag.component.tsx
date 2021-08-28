import React, { useMemo } from "react";
import { TagProps } from "antd/lib/tag";
import { Tag, Typography } from "antd";
import moment from "moment";

import { Invoice } from "../../redux/invoice/invoice.types";

const { Title } = Typography;

interface InvoiceStatusTagProps {
  invoice: Invoice;
  big?: boolean;
}

export const InvoiceStatusTag: React.FC<InvoiceStatusTagProps> = ({
  invoice,
  big
}) => {
  const tagProps: TagProps = useMemo(
    () => ({
      color:
        invoice.paid === invoice.total
          ? "green"
          : moment() > moment(invoice.dueDate)
          ? "red"
          : "blue"
    }),
    []
  );

  const tagText = useMemo(
    () =>
      invoice.paid === 0
        ? "Unpaid"
        : invoice.paid === invoice.total
        ? "Paid"
        : "Partial",
    []
  );

  return (
    <Tag {...tagProps}>
      {big ? (
        <Title style={{ margin: 0, color: "inherit" }} level={4}>
          {tagText}
        </Title>
      ) : (
        tagText
      )}
    </Tag>
  );
};

InvoiceStatusTag.defaultProps = {
  big: false
};
