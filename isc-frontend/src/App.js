import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import { Home, Login } from "./routes";
import { Immigrant } from "./routes/immigrant";
import { ISC } from "./routes/isc";
import ProtectedRoute from "./utils/protected-route";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute
          permission="immigrant-pages:visit"
          path="/immigrant"
          component={Immigrant}
        />
        <ProtectedRoute
          permission="isc-pages:visit"
          path="/isc"
          component={ISC}
        />

        <Route component={Home} />
      </Switch>
    </>
  );
}

export default App;
