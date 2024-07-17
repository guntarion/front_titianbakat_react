// src/approuter.jsx

import React, { useContext } from "react";
import AppContainer from "./appcontainer.jsx";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import config from 'config';
import { AuthContext } from "./AuthContext";

import RoutesForAdmin from "./hooks/routes-for-admin.jsx";
import RoutesForKonselor from "./hooks/routes-for-konselor.jsx";
import RoutesForUser from "./hooks/routes-for-user.jsx";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

const AppRouter = () => {
  // eslint-disable-next-line no-unused-vars
  const { role } = useContext(AuthContext); // Use role from context

  return (
    <Router basename={`${config.publicPath}`}>
      <Switch>
        <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} />
        <ProtectedRoute path="/admin" component={RoutesForAdmin} role="admin" />
        <ProtectedRoute path="/konselor" component={RoutesForKonselor} role="konselor" />
        <ProtectedRoute path="/user" component={RoutesForUser} role="user" />
        <Redirect from="/" to="/index-6" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
