import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AppContainer } from "../../components/app-container";
import { ContentWrapper } from "../../components/content-wrapper";
import { Sidebar } from "../../components/side-bar";
import { AuthContext } from "../../contexts/auth";
import { useSidebarList } from "../../hooks";
import { Profile } from "./profile";
import { ViewModules } from "./view-modules";

export const Immigrant = ({ history }) => {
  const { user } = useContext(AuthContext);
  const sidebarItems = useSidebarList(user.role);

  const sidebar = <Sidebar items={sidebarItems} history={history} />;

  return (
    <AppContainer sidebar={sidebar}>
      <Switch>
        <Route exact path="/immigrant" component={ViewModules} />
        <Route exact path="/immigrant/view-modules" component={ViewModules} />
        <Route exact path="/immigrant/profile" component={Profile} />
      </Switch>
    </AppContainer>
  );
};
