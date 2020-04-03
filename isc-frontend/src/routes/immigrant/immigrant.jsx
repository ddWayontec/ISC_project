import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AppContainer, Sidebar } from "../../components";
import { AuthContext } from "../../contexts/auth";
import { useSidebarList } from "../../hooks";
import { Profile } from "./profile";
import { ViewModules } from "./view-modules";

export const Immigrant = ({ history }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const sidebarItems = useSidebarList(user.role, user.id);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/immigrant">
          <Redirect to={`/immigrant/view-modules/${user.id}`} />
        </Route>
        <Route
          exact
          path="/immigrant/view-modules/:id"
          component={ViewModules}
        />
        <Route exact path="/immigrant/profile" component={Profile} />
      </Switch>
    </AppContainer>
  );
};
