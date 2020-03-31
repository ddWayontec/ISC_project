import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer, Sidebar } from "../../components";
import { AuthContext } from "../../contexts/auth";
import { useSidebarList } from "../../hooks";
import { AddImmigrant } from "./add-immigrant";
import { AddIscEmployee } from "./add-isc-employee";
import { Home } from "./home";
import { Profile } from "./profile";

export const ISC = ({ history }) => {
  const { user } = useContext(AuthContext);
  const sidebarItems = useSidebarList(user.role);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/isc" component={Home} />
        <Route exact path="/isc/list-all-immigrants" component={Home} />
        <Route exact path="/isc/add-immigrant" component={AddImmigrant} />
        <Route exact path="/isc/add-isc-employee" component={AddIscEmployee} />
        <Route exact path="/isc/profile" component={Profile} />
      </Switch>
    </AppContainer>
  );
};
