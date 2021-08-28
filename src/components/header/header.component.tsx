import React from "react";
import { Layout as BaseLayout, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";

const { Header: BaseHeader } = BaseLayout;

export const Header: React.FC<PageHeaderProps> = props => {
  return (
    <BaseHeader style={{ background: "#fff", padding: 0 }}>
      <PageHeader {...props} />
    </BaseHeader>
  );
};
