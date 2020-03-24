import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  sidebar: {
    alignSelf: "flex-start"
  },
  content: {
    flexGrow: 2
  }
}));

export const AppContainer = ({ sidebar, children }) => {
  const classes = useStyles();

  return sidebar ? (
    <div className={classes.root}>
      <div className={classes.sidebar}>{sidebar}</div>
      <div className={classes.content}>{children}</div>
    </div>
  ) : (
    <div>{children}</div>
  );
};
