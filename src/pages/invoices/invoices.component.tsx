import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import { InvoicesListPage } from "./list/invoices-list.component";
import { InvoicesCreateEditPage } from "./create-edit/invoices-create-edit.component";
import { InvoiceDetailsPage } from "./details/details.component";

export const InvoicesPage = () => {
  const routeMatch = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={routeMatch.path} component={InvoicesListPage} />
        <Route
          path={`${routeMatch.path}/new`}
          component={InvoicesCreateEditPage}
        />
        <Route
          path={`${routeMatch.path}/edit/:id`}
          component={InvoicesCreateEditPage}
        />
        <Route path={`${routeMatch.path}/:id`} component={InvoiceDetailsPage} />
      </Switch>
    </>
  );
};
