import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../../../components/header/header.component";
import { Content } from "../../../components/content/content.component";
import { InvoicesTable } from "../../../components/invoices-table/invoices-table.component";
import {
  getInvoices,
  cleanInvoicesList,
  cleanInvoiceInfo
} from "../../../redux/invoice/invoice.actions";
import {
  selectInvoiceIsFetching,
  selectInvoicesList
} from "../../../redux/invoice/invoice.selectors";

export const InvoicesListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanInvoiceInfo());
    dispatch(getInvoices());

    return () => {
      dispatch(cleanInvoicesList());
    };
  }, []);

  const isLoading = useSelector(selectInvoiceIsFetching);
  const invoices = useSelector(selectInvoicesList);

  return (
    <>
      <Helmet>
        <title>Invoices</title>
      </Helmet>
      <Header
        title="Invoices list"
        extra={[
          <Link to="/invoices/new" key="invoices-list-page-add-button">
            <Button type="primary">Add new</Button>
          </Link>
        ]}
      />
      <Content>
        <InvoicesTable isLoading={isLoading} data={invoices} />
      </Content>
    </>
  );
};
