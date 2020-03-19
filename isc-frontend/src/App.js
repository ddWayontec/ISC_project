import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import { Login } from "./routes";
import { Immigrant } from "./routes/immigrant";
import { ISC } from "./routes/isc";
import ProtectedRoute from "./utils/protected-route";
import { useSelector } from "react-redux";

function App() {
  // Testing to check Redux is working
  console.log(useSelector(state => state.auth));

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute
        path="/immigrant"
        permission="immigrant-pages:visit"
        component={Immigrant}
      />
      <ProtectedRoute
        path="/isc"
        permission="isc-pages:visit"
        component={ISC}
      />

      <Route component={Login} />
    </Switch>
  );
}

export default App;
