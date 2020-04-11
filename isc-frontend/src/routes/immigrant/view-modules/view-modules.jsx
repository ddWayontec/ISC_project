import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";

import { ViewModules as ViewModulesComponent } from "../../../components";
import { AuthContext } from "../../../contexts/auth";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  wrapper: {
    height: "200px",
    width: "100%",
    backgroundColor: "blue"
  },
  text: {
    fontSize: "15px",
    textAlign: "center"
  }
}));

export const ViewModules = ({ history }) => {
  const { user } = useContext(AuthContext);
  return (
    <ViewModulesComponent
      history={history}
      firstName={user.firstName}
      lastName={user.lastName}
    />
  );
};
