// src/approuter.jsx
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from "react-router-dom";
import config from 'config';
import AuthContext from "./AuthContext";
import AppContainer from "./appcontainer.jsx";
import RoutesForAdmin from "./hooks/routes-for-admin.jsx";
import RoutesForKonselor from "./hooks/routes-for-konselor.jsx";
import RoutesForUser from "./hooks/routes-for-user.jsx";
import ProtectedRoute from "./ProtectedRoute";
import LoginEmail from "./client/components/pages/authentication/login-titianbakat";

const AppRouter = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, role } = useContext(AuthContext); // Use user and role from context
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      history.push('/index-6');
    } else {
      history.push('/login-titian-bakat');
    }
    setIsLoading(false);
  }, [user, history]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Switch>
      <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} />
      <Route exact path="/login-titian-bakat" component={LoginEmail} />
      <ProtectedRoute path="/admin" component={RoutesForAdmin} role="admin" />
      <ProtectedRoute path="/konselor" component={RoutesForKonselor} role="konselor" />
      <ProtectedRoute path="/user" component={RoutesForUser} role="user" />
      <Redirect from="/" to="/index-6" />
    </Switch>
  );
};

const AppRouterWrapper = () => (
  <Router basename={`${config.publicPath}`}>
    <AppRouter />
  </Router>
);

export default AppRouterWrapper;
