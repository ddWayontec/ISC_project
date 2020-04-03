import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AppContainer, Sidebar } from "../../components";
import { AuthContext } from "../../contexts/auth";
import { useSidebarList } from "../../hooks";
import { AddImmigrant } from "./add-immigrant";
import { AddIscEmployee } from "./add-isc-employee";
import { Immigrants } from "./immigrants";
import { Profile } from "./profile";

export const ISC = ({ history }) => {
  const { user } = useContext(AuthContext);
  const sidebarItems = useSidebarList(user.role);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/isc">
          <Redirect to="/isc/immigrants" />
        </Route>
        <Route path="/isc/immigrants" component={Immigrants} />
        <Route exact path="/isc/add-immigrant" component={AddImmigrant} />
        <Route exact path="/isc/add-isc-employee" component={AddIscEmployee} />
        <Route exact path="/isc/profile" component={Profile} />
      </Switch>
    </AppContainer>
  );
};
