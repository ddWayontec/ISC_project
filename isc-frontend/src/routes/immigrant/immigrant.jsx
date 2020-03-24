import React from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "../../components/app-container";
import { Sidebar } from "../../components/side-bar";
import { useSidebarList } from "../../hooks";
import { ROLES } from "../../utils/constants";
import { Home } from "./home";
import { ViewModules } from "./view-modules";

export const Immigrant = ({ history }) => {
  // Temp testing using Redux
  const user = {
    role: ROLES.IMMIGRANT
  };
  const sidebarItems = useSidebarList(user.role);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/immigrant" component={Home} />
        <Route exact path="/immigrant/view-modules" component={ViewModules} />
      </Switch>
    </AppContainer>
  );
};
