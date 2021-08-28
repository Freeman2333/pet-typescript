import React from "react";
import Helmet from "react-helmet";

import { Header } from "../../components/header/header.component";
import { Content } from "../../components/content/content.component";

export const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <Content>
        <h1>This is dashboard</h1>
      </Content>
    </>
  );
};
