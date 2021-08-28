import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { PublicLayout } from "../../components/public-layout/public-layout.component";
import { PublicInvoiceDetailsPage } from "./invoice-details/invoice-details.component";

export const PublicPage = () => {
  const routeMatch = useRouteMatch();

  return (
    <PublicLayout>
      <Switch>
        <Route
          path={`${routeMatch.path}/invoice/:id`}
          component={PublicInvoiceDetailsPage}
        />
      </Switch>
    </PublicLayout>
  );
};
