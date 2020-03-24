import "./App.css";

import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "./components/app-container";
import { Immigrant, ISC, Login, Logout } from "./routes";
import ProtectedRoute from "./utils/protected-route";

function App() {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/logout" component={Logout} />
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
