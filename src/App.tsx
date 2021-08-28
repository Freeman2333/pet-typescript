import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import { DashboardPage } from "./pages/dashboard/dashboard.component";
import { InvoicesPage } from "./pages/invoices/invoices.component";
import { store } from "./redux";
import { PublicPage } from "./pages/public/public.component";
import { Layout } from "./components/layout/layout.component";
import { LoginPage } from "./pages/login/login.component";
import { ProtectedRoute } from "./components/private-route/private-route.component";
import { ErrorNotification } from "./components/error-notification/error-notification.component";
import { GetUser } from "./components/get-user/get-user.component";
import { MetaMaskContext } from "./utils/metamask";

const App = () => {
  return (
    <Provider store={store}>
      <MetaMaskContext.Provider>
        <GetUser />
        <Helmet titleTemplate="%s - unpaidly" />
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/login" component={LoginPage} public />
            <Route path="/p" component={PublicPage} />
            <Layout>
              <Switch>
                <ProtectedRoute exact path="/" component={DashboardPage} />
                <ProtectedRoute path="/invoices" component={InvoicesPage} />
              </Switch>
            </Layout>
          </Switch>
        </BrowserRouter>
        <ErrorNotification />
      </MetaMaskContext.Provider>
    </Provider>
  );
};

export default App;
