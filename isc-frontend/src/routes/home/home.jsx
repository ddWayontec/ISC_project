import React from "react";

import { Login } from "../login";
import { AppContainer, Sidebar } from "../../components";
import { AuthConsumer } from "../../contexts";

import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

import { Switch, Route } from "react-router-dom";

const sidebarItems = {
  isc_employee: [
    {
      text: "List all immigrants",
      icon: <PeopleIcon />,
      route: "/list-all-immigrants",
      key: "listAllImmigrants"
    },
    { text: "Add immigrant", icon: <AddIcon />, route: "/add-immigrant" },
    {
      text: "Add service provider",
      icon: <AddIcon />,
      route: "/add-service-provider",
      key: "addServiceProvider"
    },
    {
      text: "Add ISC employee",
      icon: <AddIcon />,
      route: "/add-isc-employee",
      key: "addIscEmployee"
    }
  ],
  visitor: [
    {
      text: "My Modules",
      icon: <ViewModuleIcon />,
      route: "/view-modules",
      key: "viewModules"
    }
  ]
};

export const Home = props => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <AppContainer>
          <Sidebar
            history={props.history}
            items={sidebarItems[user.role] ? sidebarItems[user.role] : []}
          />
          <Switch>
            <Route path="/list-all-immigrants" component={Login} />
          </Switch>
        </AppContainer>
      )}
    </AuthConsumer>
  );
};
