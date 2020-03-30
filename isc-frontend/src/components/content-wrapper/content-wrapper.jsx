import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export const ContentWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.contentWrapper}>{children}</div>;
};
