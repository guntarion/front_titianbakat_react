import React, { createContext, useState } from "react";
import AppContainer from "./appcontainer.jsx"; 
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"; 
import config from 'config';

// Create a context to share the authentication state across the component tree
export const Appcontext = createContext();

const AppRouter = () => {
  // useState hook to manage the authentication state; initially set to "user"
  const [isAuth, setIsAuth] = useState("user");
  // The config object is imported to access configuration settings such as publicPath
  return (
    // Router component to handle routing in the application
    <Router basename={`${config.publicPath}`}>
      {/* Context Provider to pass down isAuth and setIsAuth to the entire component tree */}
      <Appcontext.Provider value={{ isAuth, setIsAuth }}>
        {/* Switch component to group Route components; renders the first matching route */}
        <Switch>
          {/* Route component to render AppContainer when the path is "/index-6" */}
          <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} />
          {/* Redirect component to redirect from the root path "/" to "/index-6" */}
          <Redirect from="/" to="/index-6" />
        </Switch>
      </Appcontext.Provider>
    </Router>
  );
};

export default AppRouter;
