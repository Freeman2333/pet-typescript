import React, { useMemo, useCallback, useEffect } from "react";
import Helmet from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../../../components/header/header.component";
import { Content } from "../../../components/content/content.component";
import { InvoiceForm } from "../../../components/invoice-form/invoice-form.component";
import {
  selectInvoiceIsFetching,
  selectSingleInvoice
} from "../../../redux/invoice/invoice.selectors";
import { Spin } from "antd";
import { getInvoice } from "../../../redux/invoice/invoice.actions";
import { getClient } from "../../../redux/client/client.actions";

interface InvoicesCreateEditPageParams {
  id?: string;
}

export const InvoicesCreateEditPage = () => {
  const params = useParams<InvoicesCreateEditPageParams>();
  const history = useHistory();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectInvoiceIsFetching);
  const invoiceData = useSelector(selectSingleInvoice);
  const title = useMemo(() => {
    if (params.id) {
      return isLoading || !invoiceData
        ? "Loading..."
        : `Edit invoice ${invoiceData.title}`;
    }

    return "New invoice";
  }, [isLoading]);
  useEffect(() => {
    if (!isLoading && params.id && !invoiceData) {
      dispatch(getInvoice(params.id));
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(getClient());
  }, []);

  const onBackHandler = useCallback(() => {
    if (params.id) {
      history.push(`/invoices/${params.id}`);
    } else {
      history.push(`/invoices`);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header title={title} onBack={onBackHandler} />
      <Content>
        {isLoading || (params.id && !invoiceData) ? (
          <Spin />
        ) : (
          <InvoiceForm
            initialValues={params.id && invoiceData ? invoiceData : undefined}
          />
        )}
      </Content>
    </>
  );
};
