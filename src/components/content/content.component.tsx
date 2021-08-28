import React from "react";
import { Layout as BaseLayout } from "antd";

const { Content: BaseContent } = BaseLayout;

export const Content: React.FC = ({ children }) => {
  return (
    <>
      <BaseContent style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: 360,
            margin: "16px 0"
          }}
        >
          {children}
        </div>
      </BaseContent>
    </>
  );
};
