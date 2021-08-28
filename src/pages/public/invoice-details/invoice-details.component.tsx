import React, { useEffect, useMemo } from "react";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Spin, Col, Row } from "antd";

import { Header } from "../../../components/header/header.component";
import { Content } from "../../../components/content/content.component";
import { InvoiceMetadata } from "../../../components/invoice-metadata/invoice-metadata.component";
import { EditableInvoiceTable } from "../../../components/editable-invoice-table/editable-invoice-table.component";
import {
  selectInvoiceIsFetching,
  selectSingleInvoice
} from "../../../redux/invoice/invoice.selectors";
import { getInvoice } from "../../../redux/invoice/invoice.actions";
import { PayWithMetamask } from "../../../components/pay-with-metamask/pay-with-metamask.component";

interface PublicInvoiceDetailsPageParams {
  id: string;
}

export const PublicInvoiceDetailsPage = () => {
  const isLoading = useSelector(selectInvoiceIsFetching);
  const invoiceData = useSelector(selectSingleInvoice);
  const dispatch = useDispatch();
  const params = useParams<PublicInvoiceDetailsPageParams>();
  useEffect(() => {
    dispatch(getInvoice(params.id));
  }, []);

  const title = useMemo(() => {
    return isLoading || !invoiceData
      ? "Loading..."
      : `Invoice ${invoiceData.title}`;
  }, [isLoading, invoiceData]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header title={title} />
      <Content>
        {isLoading || !invoiceData ? (
          <Spin />
        ) : (
          <>
            <InvoiceMetadata invoice={invoiceData} />
            <EditableInvoiceTable readonly invoice={invoiceData} />
            <Row type="flex" justify="center" style={{ marginTop: 16 }}>
              <Col>
                <PayWithMetamask invoice={invoiceData} />
              </Col>
            </Row>
          </>
        )}
      </Content>
    </>
  );
};
