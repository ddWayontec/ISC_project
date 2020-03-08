import React from "react";

import { Login } from "../login";

import { AppContainer, Sidebar } from "../../components";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";

import { Switch, Route } from "react-router-dom";

const items = [
  {
    text: "List all immigrants",
    icon: <PeopleIcon />,
    route: "/list-all-immigrants"
  },
  { text: "Add immigrant", icon: <AddIcon />, route: "/add-immigrant" },
  {
    text: "Add service provider",
    icon: <AddIcon />,
    route: "/add-service-provider"
  },
  { text: "Add ISC employee", icon: <AddIcon />, route: "/add-isc-employee" }
];

export const Home = props => {
  return (
    <AppContainer>
      <Sidebar history={props.history} items={items} />
      <Switch>
        <Route path="/list-all-immigrants" component={Login} />
      </Switch>
    </AppContainer>
  );
};
