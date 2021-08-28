import React, { createElement } from "react";
import { RouteProps, Route, Redirect, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  public?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps & RouteProps> = ({
  component,
  ...props
}) => {
  const token = localStorage.getItem("jwt");
  const location = useLocation();

  if (token && location.pathname === "/login") {
    return <Route {...props} render={() => <Redirect to="/" />} />;
  }

  if (!token && location.pathname !== "/login") {
    return <Route {...props} render={() => <Redirect to="/login" />} />;
  }

  return (
    <Route
      {...props}
      render={renderProps => createElement(component!, renderProps)}
    />
  );
};

ProtectedRoute.defaultProps = {
  public: false
};
