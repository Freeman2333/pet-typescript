import React from "react";
import { Layout as BaseLayout, BackTop } from "antd";

import { LeftMenu } from "../left-menu/left-menu.components";

const { Footer } = BaseLayout;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <BaseLayout style={{ minHeight: "100vh" }}>
        <LeftMenu />
        <BaseLayout>
          {children}
          <Footer style={{ textAlign: "center" }}>
            Unpaidly &copy; 2020 Created by Dmytro Batarin
          </Footer>
        </BaseLayout>
      </BaseLayout>
      <BackTop />
    </>
  );
};
