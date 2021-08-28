import React, { useState, useCallback, useMemo } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";

import { leftMenuRoutes, LeftMenuRoute } from "./left-menu.data";

const { Sider } = Layout;

export const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const location = useLocation();
  const history = useHistory();

  const renderRoutes = useCallback((leftMenuRoute: LeftMenuRoute) => {
    return (
      <Menu.Item key={`left-menu.component-${leftMenuRoute.key}`}>
        <Link to={leftMenuRoute.link!}>
          <Icon type={leftMenuRoute.icon} />
          <span>{leftMenuRoute.label}</span>
        </Link>
      </Menu.Item>
    );
  }, []);

  const filterRoute = useCallback(route => route.show !== false, []);

  const selectedKeys = useMemo(() => {
    const route = leftMenuRoutes.find(leftMenuRoute =>
      leftMenuRoute.regexr.test(location.pathname)
    );

    if (!route) {
      return [];
    }

    return [`left-menu.component-${route.key}`];
  }, [location.pathname]);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    history.push("/");
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
    >
      <div className="logo" />
      <Menu defaultSelectedKeys={selectedKeys} mode="inline">
        {leftMenuRoutes.filter(filterRoute).map(renderRoutes)}
        <Menu.Item onClick={logout}>
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
