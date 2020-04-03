import { makeStyles } from "@material-ui/core";
import React from "react";

import { ViewModules as ViewModulesComponent } from "../../../components";

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

export const ViewModules = ({ history }) => (
  <ViewModulesComponent history={history} />
);
