import React, { useCallback, useMemo, useEffect } from "react";
import Helmet from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../../../components/header/header.component";
import { Content } from "../../../components/content/content.component";
import { EditableInvoiceTable } from "../../../components/editable-invoice-table/editable-invoice-table.component";
import { InvoiceMetadata } from "../../../components/invoice-metadata/invoice-metadata.component";
import {
  selectInvoiceIsFetching,
  selectSingleInvoice
} from "../../../redux/invoice/invoice.selectors";
import { getInvoice } from "../../../redux/invoice/invoice.actions";

interface InvoiceDetailsPageParams {
  id: string;
}

export const InvoiceDetailsPage = () => {
  const history = useHistory();
  const onBackHandler = useCallback(() => {
    history.push("/invoices");
  }, []);

  const isLoading = useSelector(selectInvoiceIsFetching);
  const invoiceData = useSelector(selectSingleInvoice);
  const dispatch = useDispatch();
  const params = useParams<InvoiceDetailsPageParams>();
  useEffect(() => {
    dispatch(getInvoice(params.id));
  }, []);

  const title = useMemo(() => {
    return isLoading || !invoiceData
      ? "Loading..."
      : `Invoice ${invoiceData.title}`;
  }, [isLoading, invoiceData]);
  const headerExtra = useMemo(() => {
    return isLoading || !invoiceData
      ? undefined
      : [
          <Link
            to={`/invoices/edit/${invoiceData.id}`}
            key="invoice-details-page-edit-button"
          >
            <Button type="primary">Edit</Button>
          </Link>,
          <Link
            to={`/p/invoice/${invoiceData.id}`}
            key="invoice-details-page-public-button"
            target="_blank"
          >
            <Button type="primary">Open public preview</Button>
          </Link>
        ];
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header title={title} extra={headerExtra} onBack={onBackHandler} />
      <Content>
        {isLoading || !invoiceData ? (
          <Spin />
        ) : (
          <>
            <InvoiceMetadata invoice={invoiceData} />
            <EditableInvoiceTable readonly invoice={invoiceData} />
          </>
        )}
      </Content>
    </>
  );
};
