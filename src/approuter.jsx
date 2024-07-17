import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import config from 'config';
import AuthContext from "./AuthContext";
import AppContainer from "./appcontainer.jsx";
import RoutesForAdmin from "./hooks/routes-for-admin.jsx";
import RoutesForKonselor from "./hooks/routes-for-konselor.jsx";
import RoutesForUser from "./hooks/routes-for-user.jsx";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import LoginEmail from "./client/components/pages/authentication/login-titianbakat"; // Import the login component

const AppRouter = () => {
  // eslint-disable-next-line no-unused-vars
  const { role } = useContext(AuthContext); // Use role from context

  return (
    <Router basename={`${config.publicPath}`}>
      <Switch>
        <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} />
        <Route exact path="/login-titian-bakat" component={LoginEmail} /> {/* Public route for login */}
        <ProtectedRoute path="/admin" component={RoutesForAdmin} role="admin" />
        <ProtectedRoute path="/konselor" component={RoutesForKonselor} role="konselor" />
        <ProtectedRoute path="/user" component={RoutesForUser} role="user" />
        <Redirect from="/" to="/index-6" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
