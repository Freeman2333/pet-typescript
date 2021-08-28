import React from "react";
import { Helmet } from "react-helmet";
import { Row, Col, Typography } from "antd";

import { PublicLayout } from "../../components/public-layout/public-layout.component";
import { Content } from "../../components/content/content.component";
import { LoginForm } from "../../components/login-form/login-form.component";

const { Title } = Typography;

export const LoginPage = () => (
  <PublicLayout>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <Row>
      <Col span={8} offset={8}>
        <Content>
          <Title level={1} style={{ textAlign: "center" }}>
            unpaidly
          </Title>
          <LoginForm />
        </Content>
      </Col>
    </Row>
  </PublicLayout>
);
