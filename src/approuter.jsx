import React, { createContext, useState } from "react";
import AppContainer from "./appcontainer.jsx";
import { BrowserRouter as Router, Route, Redirect, Switch  } from "react-router-dom";
import config from 'config';


export const Appcontext = createContext();

const AppRouter = () => {
  const [isAuth, setIsAuth] = useState("user");
  // const config = "/react/template/";
  return (
    <Router basename={`${config.publicPath}`}>

      <Appcontext.Provider value={{ isAuth, setIsAuth }}>
        <Switch>
          <Route exact path="/index-6" render={(props) => <AppContainer {...props} />} />
          <Redirect from="/" to="/index-6" />
        </Switch>
      </Appcontext.Provider>
    </Router>
  );
};

export default AppRouter;
