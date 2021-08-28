import React, { useCallback } from "react";
import { Table } from "antd";

import { invoicesTableColumns } from "./invoices-table.data";
import { Invoice } from "../../redux/invoice/invoice.types";

interface InvoicesTableProps {
  isLoading?: boolean;
  data: Invoice[];
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({
  isLoading,
  data
}) => {
  const tableRowKey = useCallback((record: Invoice) => {
    return `invoices-table-${record.id}`;
  }, []);

  return (
    <Table
      dataSource={data}
      columns={invoicesTableColumns}
      pagination={false}
      showHeader={false}
      style={{ border: "1px solid #e8e8e8" }}
      rowKey={tableRowKey}
      loading={isLoading}
    />
  );
};

InvoicesTable.defaultProps = {
  isLoading: false
};
