// src/approuter.jsx
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from 'config';
import AuthContext from "./AuthContext";
// import AppContainer from "./appcontainer.jsx";
import RoutesForAdmin from "./hooks/routes-for-admin.jsx";
import RoutesForKonselor from "./hooks/routes-for-konselor.jsx";
import RoutesForUser from "./hooks/routes-for-user.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Home6 from "./client/components/home/home6.jsx";
import LoginEmail from "./client/components/pages/authentication/login-titianbakat";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  // const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Switch>
      <Route exact path="/" component={Home6} />
      <Route exact path="/index-6" component={Home6} />
      {/* <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} /> */}
      <Route exact path="/login-titian-bakat" component={LoginEmail} />
      <ProtectedRoute path="/admin" component={RoutesForAdmin} role="admin" />
      <ProtectedRoute path="/konselor" component={RoutesForKonselor} role="konselor" />
      <ProtectedRoute path="/user" component={RoutesForUser} role="user" />
      <Route component={Home6} />
    </Switch>
  );
};

const AppRouterWrapper = () => (
  <Router basename={`${config.publicPath}`}>
    <AppRouter />
  </Router>
);

export default AppRouterWrapper;
