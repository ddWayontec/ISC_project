import React from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "../../components/app-container";
import { Sidebar } from "../../components/side-bar";
import { useSidebarList } from "../../hooks";
import { ROLES } from "../../utils/constants";
import { Home } from "./home";

export const ISC = ({ history }) => {
  // Temp testing, use redux instead
  const user = {
    role: ROLES.ISC_EMPLOYEE
  };
  const sidebarItems = useSidebarList(user.role);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/isc" component={Home} />
        <Route exact path="/isc/list-all-immigrants" component={Home} />
      </Switch>
    </AppContainer>
  );
};
