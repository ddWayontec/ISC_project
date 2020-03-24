import "./App.css";

import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "./components/app-container";
import { AuthContext } from "./contexts/auth";
import { Login } from "./routes";
import { Immigrant } from "./routes/immigrant";
import { ISC } from "./routes/isc";
import ProtectedRoute from "./utils/protected-route";

function App() {
  const { handleAuthentication } = useContext(AuthContext);
  return (
    <AppContainer>
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

        <Route>
          <Login />
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;
