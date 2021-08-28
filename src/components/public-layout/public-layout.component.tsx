import React from "react";
import { Layout as BaseLayout, BackTop } from "antd";

const { Footer } = BaseLayout;

export const PublicLayout: React.FC = ({ children }) => {
  return (
    <>
      <BaseLayout style={{ minHeight: "100vh" }}>
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
