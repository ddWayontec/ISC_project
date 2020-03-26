import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "../../components/app-container";
import { Sidebar } from "../../components/side-bar";
import { AuthContext } from "../../contexts/auth";
import { useSidebarList } from "../../hooks";
import { ROLES } from "../../utils/constants";
import { Home } from "./home";

export const ISC = ({ history }) => {
  const { user } = useContext(AuthContext);
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
