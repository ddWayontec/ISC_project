import React, { useContext, useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import { Home, Login } from "./routes";
import { Immigrant } from "./routes/immigrant";
import { ISC } from "./routes/isc";
import ProtectedRoute from "./utils/protected-route";
import { ROLES } from "./utils/constants";
import { AuthContext } from "./contexts/auth";

function App() {
  // TEST -- fake login --
  // set person to master when they go home
  const { setSession } = useContext(AuthContext);
  useEffect(
    () =>
      setSession({
        id: "fake id",
        email: "fake email",
        accessToken: "fake accessToken",
        role: ROLES.IMMIGRANT
      }),
    []
  );
  // TEST -- fake login --

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
